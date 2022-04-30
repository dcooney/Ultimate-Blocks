import PropTypes from "prop-types";

const { __ } = wp.i18n;

const { InspectorControls } = wp.blockEditor || wp.editor;

const {
	PanelBody,
	SelectControl,
	ToggleControl,
	QueryControls,
	TextControl,
	RangeControl,
} = wp.components;
const { Component } = wp.element;
const { addQueryArgs } = wp.url;
const { apiFetch } = wp;

const MAX_POSTS_COLUMNS = 3;

class Autocomplete extends Component {
	constructor(props) {
		super(props);
		this.state = { userInput: "", showSuggestions: false };

		this.listItem = [];
	}

	render() {
		const filteredList = this.props.list.filter(
			(i) =>
				i.label.toLowerCase().indexOf(this.state.userInput.toLowerCase()) > -1
		);

		const { userInput, showSuggestions } = this.state;

		return (
			<div>
				<input
					type="text"
					value={userInput}
					style={{ width: "200px" }}
					onChange={(e) =>
						this.setState({
							userInput: e.target.value,
							showSuggestions: e.target.value.length > 0,
						})
					}
					onKeyDown={(e) => {
						if (e.key === "ArrowDown" && filteredList.length) {
							if (showSuggestions) {
								this.listItem[0].focus();
								e.preventDefault();
							} else {
								this.setState({ showSuggestions: true });
							}
						}
					}}
				/>
				{showSuggestions && (
					<div className={this.props.className} style={{ width: "200px" }}>
						{filteredList.map((item, i) => (
							<div
								className={"ub-autocomplete-list-item"}
								ref={(elem) => (this.listItem[i] = elem)}
								onClick={() => {
									this.props.addToSelection(item);
									this.setState({ userInput: "", showSuggestions: false });
								}}
								onKeyDown={(e) => {
									if (e.key === "ArrowDown") {
										if (i < filteredList.length - 1) {
											e.preventDefault();
											this.listItem[i + 1].focus();
										} else {
											this.listItem[i].blur();
											this.setState({ showSuggestions: false });
										}
									}
									if (e.key === "ArrowUp") {
										if (i > 0) {
											e.preventDefault();
											this.listItem[i - 1].focus();
										} else {
											this.listItem[i].blur();
											this.setState({ showSuggestions: false });
										}
									}
								}}
								tabIndex={0}
							>
								{item.label}
							</div>
						))}
					</div>
				)}
			</div>
		);
	}
}

Autocomplete.propTypes = {
	list: PropTypes.array,
	selection: PropTypes.array,
};

Autocomplete.defaultProps = {
	list: [],
	selection: PropTypes.array,
};

export default class Inspector extends Component {
	constructor() {
		super();
		this.state = {
			categoriesList: [],
			tagsList: [],
			authorsList: [],
			currentTagName: "",

			topMarginRaw: "",
			rightMarginRaw: "",
			bottomMarginRaw: "",
			leftMarginRaw: "",
			lastEditedMargin: "",

			topPaddingRaw: "",
			rightPaddingRaw: "",
			bottomPaddingRaw: "",
			leftPaddingRaw: "",
			lastEditedPadding: "",
		};
	}
	componentDidMount() {
		this.stillMounted = true;
		this.categoryFetchRequest = apiFetch({
			path: addQueryArgs("/wp/v2/categories", { per_page: -1 }),
		})
			.then((categoriesList) => {
				if (this.stillMounted) {
					this.setState({ categoriesList });
				}
			})
			.catch(() => {
				if (this.stillMounted) {
					this.setState({ categoriesList: [] });
				}
			});

		this.tagFetchRequest = apiFetch({
			path: addQueryArgs("/wp/v2/tags", { per_page: -1 }),
		})
			.then((tagsList) => {
				if (this.stillMounted) {
					this.setState({ tagsList });
				}
			})
			.catch(() => {
				if (this.stillMounted) {
					this.setState({ tagsList: [] });
				}
			});
		this.authorFetchRequest = apiFetch({
			path: addQueryArgs("/wp/v2/users", { per_page: -1, who: "authors" }),
		})
			.then((authorsList) => {
				if (this.stillMounted) {
					this.setState({ authorsList });
				}
			})
			.catch(() => {
				if (this.stillMounted) {
					this.setState({ authorsList: [] });
				}
			});

		const {
			topMargin,
			rightMargin,
			bottomMargin,
			leftMargin,
			topPadding,
			rightPadding,
			bottomPadding,
			leftPadding,
		} = this.props.attributes;

		this.setState({
			topMarginRaw: String(topMargin || ""),
			rightMarginRaw: String(rightMargin || ""),
			bottomMarginRaw: String(bottomMargin || ""),
			leftMarginRaw: String(leftMargin || ""),

			topPaddingRaw: String(topPadding || ""),
			rightPaddingRaw: String(rightPadding || ""),
			bottomPaddingRaw: String(bottomPadding || ""),
			leftPaddingRaw: String(leftPadding || ""),
		});
	}

	componentWillUnmount() {
		this.stillMounted = false;
	}

	render() {
		const {
			categoriesList,
			tagsList,
			authorsList,

			topPaddingRaw,
			rightPaddingRaw,
			bottomPaddingRaw,
			leftPaddingRaw,
			lastEditedPadding,

			topMarginRaw,
			rightMarginRaw,
			bottomMarginRaw,
			leftMarginRaw,
			lastEditedMargin,
		} = this.state;

		const {
			attributes: {
				checkPostImage,
				postImageWidth,
				preservePostImageAspectRatio,
				postImageHeight,
				checkPostAuthor,
				checkPostDate,
				checkPostExcerpt,
				checkPostLink,
				excerptLength,
				readMoreText,
				amountPosts,
				postLayout,
				columns,
				categories,
				categoryArray,
				orderBy,
				order,
				checkPostTitle,
				postTitleTag,
				authorArray,
				tagArray,

				hasCommonMargin,
				topMargin,
				rightMargin,
				bottomMargin,
				leftMargin,

				topMarginUnit,
				rightMarginUnit,
				bottomMarginUnit,
				leftMarginUnit,

				hasCommonPadding,
				topPadding,
				rightPadding,
				bottomPadding,
				leftPadding,

				topPaddingUnit,
				rightPaddingUnit,
				bottomPaddingUnit,
				leftPaddingUnit,
			},
			setAttributes,
			posts,
		} = this.props;

		// Check for posts
		const hasPosts = Array.isArray(posts) && posts.length;

		// Post type options
		const postTypeOptions = [
			{ value: "grid", label: __("Grid", "ultimate-blocks") },
			{ value: "list", label: __("List", "ultimate-blocks") },
		];

		const categorySuggestions = categoriesList.reduce(
			(accumulator, category) => ({
				...accumulator,
				[category.name]: category,
			}),
			{}
		);

		const queryControlPanel = QueryControls.toString().includes(
			"selectedCategories"
		) ? (
			<QueryControls
				{...{ order, orderBy }}
				numberOfItems={amountPosts}
				categorySuggestions={categorySuggestions}
				selectedCategories={categoryArray}
				onOrderChange={(value) => setAttributes({ order: value })}
				onOrderByChange={(value) => setAttributes({ orderBy: value })}
				onCategoryChange={(tokens) => {
					const suggestions = categoriesList.reduce(
						(accumulator, category) => ({
							...accumulator,
							[category.name]: category,
						}),
						{}
					);
					const allCategories = tokens.map((token) =>
						typeof token === "string" ? suggestions[token] : token
					);
					setAttributes({ categoryArray: allCategories });
				}}
				onNumberOfItemsChange={(value) => setAttributes({ amountPosts: value })}
			/>
		) : (
			<QueryControls
				{...{ order, orderBy }}
				numberOfItems={amountPosts}
				categoriesList={categoriesList}
				categorySuggestions={categoriesList}
				selectedCategories={categories}
				onOrderChange={(value) => setAttributes({ order: value })}
				onOrderByChange={(value) => setAttributes({ orderBy: value })}
				onCategoryChange={(value) =>
					setAttributes({ categories: "" !== value ? value : undefined })
				}
				onNumberOfItemsChange={(value) => setAttributes({ amountPosts: value })}
			/>
		);

		const setAllMargins = (val) => {
			setAttributes({
				topMargin: val,
				rightMargin: val,
				bottomMargin: val,
				leftMargin: val,
			});
		};

		const setAllMarginUnits = (val) => {
			setAttributes({
				topMarginUnit: val,
				rightMarginUnit: val,
				bottomMarginUnit: val,
				leftMarginUnit: val,
			});
		};

		const setAllRawMargins = (val) => {
			this.setState({
				topMarginRaw: val,
				rightMarginRaw: val,
				bottomMarginRaw: val,
				leftMarginRaw: val,
			});
		};

		const setAllPaddings = (val) => {
			setAttributes({
				topPadding: val,
				rightPadding: val,
				bottomPadding: val,
				leftPadding: val,
			});
		};

		const setAllPaddingUnits = (val) => {
			setAttributes({
				topPaddingUnit: val,
				rightPaddingUnit: val,
				bottomPaddingUnit: val,
				leftPaddingUnit: val,
			});
		};

		const setAllRawPaddings = (val) => {
			this.setState({
				topPaddingRaw: val,
				rightPaddingRaw: val,
				bottomPaddingRaw: val,
				leftPaddingRaw: val,
			});
		};
		return (
			<InspectorControls>
				<PanelBody title={__("Post Grid Settings", "ultimate-blocks")}>
					{Array.isArray(posts) && posts.length > 0 && (
						<>
							<SelectControl
								label={__("Grid Type", "ultimate-blocks")}
								options={postTypeOptions}
								value={postLayout}
								onChange={(postLayout) => setAttributes({ postLayout })}
							/>
							{"grid" === postLayout && (
								<RangeControl
									label={__("Columns", "ultimate-blocks")}
									value={columns}
									onChange={(columns) => setAttributes({ columns })}
									min={1}
									max={
										!hasPosts
											? MAX_POSTS_COLUMNS
											: Math.min(MAX_POSTS_COLUMNS, posts.length)
									}
								/>
							)}
						</>
					)}
					<p>{__("Authors")}</p>
					{authorArray && (
						<div className="ub-autocomplete-container">
							{authorsList
								.filter((t) => authorArray.includes(t.id))
								.map((t) => (
									<span className="ub-autocomplete-selection">
										{t.name}
										<span
											className="dashicons dashicons-dismiss"
											onClick={() =>
												setAttributes({
													authorArray: authorArray.filter(
														(sel) => sel !== t.id
													),
												})
											}
										/>
									</span>
								))}
						</div>
					)}
					<Autocomplete
						className="ub-autocomplete-list"
						list={authorsList
							.filter((t) => !authorArray.includes(t.id))
							.map((t) => ({ label: t.name, value: t.id }))}
						selection={authorArray}
						addToSelection={(item) => {
							if (!authorArray.includes(item.value)) {
								setAttributes({ authorArray: [...authorArray, item.value] });
							}
						}}
					/>
					{queryControlPanel}
					<p>{__("Tags")}</p>
					{tagArray && (
						<div className="ub-autocomplete-container">
							{tagsList
								.filter((t) => tagArray.includes(t.id))
								.map((t) => (
									<span className="ub-autocomplete-selection">
										{t.name}
										<span
											className="dashicons dashicons-dismiss"
											onClick={() => {
												setAttributes({
													tagArray: tagArray.filter((sel) => sel !== t.id),
												});
											}}
										/>
									</span>
								))}
						</div>
					)}
					<Autocomplete
						className="ub-autocomplete-list"
						list={tagsList
							.filter((t) => !tagArray.includes(t.id))
							.map((t) => ({ label: t.name, value: t.id }))}
						selection={tagArray}
						addToSelection={(item) => {
							if (!tagArray.includes(item.value)) {
								setAttributes({ tagArray: [...tagArray, item.value] });
							}
						}}
					/>
				</PanelBody>
				{Array.isArray(posts) && posts.length > 0 && (
					<PanelBody title={__("Post Grid Content", "ultimate-blocks")}>
						<ToggleControl
							label={__("Display Featured Image", "ultimate-blocks")}
							checked={checkPostImage}
							onChange={(checkPostImage) => setAttributes({ checkPostImage })}
						/>
						{checkPostImage && (
							<>
								<TextControl
									label={__("Post Image Width", "ultimate-blocks")}
									type="number"
									min={1}
									value={postImageWidth}
									onChange={(val) =>
										setAttributes({ postImageWidth: Number(val) })
									}
								/>
								<ToggleControl
									label={__("Preserve Aspect Ratio", "ultimate-blocks")}
									checked={preservePostImageAspectRatio}
									onChange={(preservePostImageAspectRatio) =>
										setAttributes({ preservePostImageAspectRatio })
									}
								/>
								{!preservePostImageAspectRatio && (
									<TextControl
										label={__("Post Image Height", "ultimate-blocks")}
										type="number"
										min={1}
										value={postImageHeight}
										onChange={(val) =>
											setAttributes({ postImageHeight: Number(val) })
										}
									/>
								)}
							</>
						)}
						<ToggleControl
							label={__("Display Author", "ultimate-blocks")}
							checked={checkPostAuthor}
							onChange={(checkPostAuthor) => setAttributes({ checkPostAuthor })}
						/>
						<ToggleControl
							label={__("Display Date", "ultimate-blocks")}
							checked={checkPostDate}
							onChange={(checkPostDate) => setAttributes({ checkPostDate })}
						/>
						<ToggleControl
							label={__("Display Excerpt", "ultimate-blocks")}
							checked={checkPostExcerpt}
							onChange={(checkPostExcerpt) =>
								setAttributes({ checkPostExcerpt })
							}
						/>
						{checkPostExcerpt && (
							<RangeControl
								label={__("Excerpt Length", "ultimate-blocks")}
								value={excerptLength}
								onChange={(value) => setAttributes({ excerptLength: value })}
								min={0}
								max={200}
							/>
						)}
						<ToggleControl
							label={__("Display Continue Reading Link", "ultimate-blocks")}
							checked={checkPostLink}
							onChange={(checkPostLink) => setAttributes({ checkPostLink })}
						/>
						{checkPostLink && (
							<TextControl
								label={__("Customize Continue Reading Text", "ultimate-blocks")}
								type="text"
								value={readMoreText}
								onChange={(value) => setAttributes({ readMoreText: value })}
							/>
						)}
						<ToggleControl
							label={__("Display Title", "ultimate-blocks")}
							checked={checkPostTitle}
							onChange={(checkPostTitle) => setAttributes({ checkPostTitle })}
						/>
						{checkPostTitle && (
							<SelectControl
								label={__("Title tag", "ultimate-blocks")}
								options={["h2", "h3", "h4"].map((a) => ({
									value: a,
									label: __(a),
								}))}
								value={postTitleTag}
								onChange={(postTitleTag) => setAttributes({ postTitleTag })}
							/>
						)}
					</PanelBody>
				)}
				<PanelBody title={__("Spacing")}>
					<p>{__("Margin")}</p>
					<>
						<ToggleControl
							label={__("Set common margin size")}
							checked={hasCommonMargin}
							onChange={() => {
								setAttributes({ hasCommonMargin: !hasCommonMargin });

								const setMarginValue = (
									newMargin,
									newMarginUnit,
									newMarginRaw
								) => {
									setAllMargins(newMargin);
									setAllMarginUnits(newMarginUnit);
									setAllRawMargins(newMarginRaw);
								};

								if (hasCommonMargin) {
									setMarginValue(topMargin, topMarginUnit, topMarginRaw);
								} else {
									switch (lastEditedMargin) {
										case "top":
											setMarginValue(topMargin, topMarginUnit, topMarginRaw);
											break;
										case "right":
											setMarginValue(
												rightMargin,
												rightMarginUnit,
												rightMarginRaw
											);
											break;
										case "bottom":
											setMarginValue(
												bottomMargin,
												bottomMarginUnit,
												bottomMarginRaw
											);
											break;
										case "left":
											setMarginValue(leftMargin, leftMarginUnit, leftMarginRaw);
											break;
										default:
											if (topMargin) {
												setMarginValue(topMargin, topMarginUnit, topMarginRaw);
											} else if (rightMargin) {
												setMarginValue(
													rightMargin,
													rightMarginUnit,
													rightMarginRaw
												);
											} else if (bottomMargin) {
												setMarginValue(
													bottomMargin,
													bottomMarginUnit,
													bottomMarginRaw
												);
											} else if (leftMargin) {
												setMarginValue(
													leftMargin,
													leftMarginUnit,
													leftMarginRaw
												);
											} else {
												setAllMargins(0);
												setAllMarginUnits("px");
												setAllRawMargins("");
											}
									}
								}

								this.setState({ lastEditedMargin: "" });
							}}
						/>
						<div className="ub-spacing-margin-unit-container">
							{["px", "em", "%"].map((u) => (
								<span
									onClick={() => {
										if (hasCommonMargin) {
											setAllMarginUnits(u);
										} else {
											switch (lastEditedMargin) {
												case "top":
													setAttributes({ topMarginUnit: u });
													break;
												case "right":
													setAttributes({ rightMarginUnit: u });
													break;
												case "bottom":
													setAttributes({ bottomMarginUnit: u });
													break;
												case "left":
													setAttributes({ leftMarginUnit: u });
													break;
												default:
													setAllMarginUnits(u);
											}
										}
									}}
									style={{
										fontWeight: topMarginUnit === u ? "bold" : "normal",
									}}
								>
									{u}
								</span>
							))}
						</div>
						<div className="ub-spacing-panel">
							<input
								type="number"
								value={topMarginRaw}
								min={0}
								onChange={(e) => {
									this.setState({ topMarginRaw: e.target.value });
									setAttributes({ topMargin: Number(e.target.value) });
								}}
								onFocus={() => {
									if (hasCommonMargin) {
										this.setState({ lastEditedMargin: "top" });
									}
								}}
							/>
							{!hasCommonMargin && (
								<>
									<input
										type="number"
										value={rightMarginRaw}
										min={0}
										onChange={(e) => {
											this.setState({ rightMarginRaw: e.target.value });
											setAttributes({ rightMargin: Number(e.target.value) });
										}}
										onFocus={() => this.setState({ lastEditedMargin: "right" })}
									/>
									<input
										type="number"
										value={bottomMarginRaw}
										min={0}
										onChange={(e) => {
											this.setState({ bottomMarginRaw: e.target.value });
											setAttributes({ bottomMargin: Number(e.target.value) });
										}}
										onFocus={() =>
											this.setState({ lastEditedMargin: "bottom" })
										}
									/>
									<input
										type="number"
										value={leftMarginRaw}
										min={0}
										onChange={(e) => {
											this.setState({ leftMarginRaw: e.target.value });
											setAttributes({ leftMargin: Number(e.target.value) });
										}}
										onFocus={() => this.setState({ lastEditedMargin: "left" })}
									/>
								</>
							)}
							<button
								onClick={() => {
									setAllMargins(0);
									setAllMarginUnits("px");
									setAllRawMargins("");
								}}
							>
								{__("Reset")}
							</button>
							{!hasCommonMargin && (
								<>
									<span>{__("Top")}</span>
									<span>{__("Right")}</span>
									<span>{__("Bottom")}</span>
									<span>{__("Left")}</span>
								</>
							)}
						</div>
					</>
					<p>{__("Padding")}</p>
					<>
						<ToggleControl
							label={__("Set common padding size")}
							checked={hasCommonPadding}
							onChange={() => {
								setAttributes({ hasCommonPadding: !hasCommonPadding });

								const setPaddingValue = (
									newPadding,
									newPaddingUnit,
									newPaddingRaw
								) => {
									setAllPaddings(newPadding);
									setAllPaddingUnits(newPaddingUnit);
									setAllRawPaddings(newPaddingRaw);
								};

								if (hasCommonPadding) {
									setPaddingValue(topPadding, topPaddingUnit, topPaddingRaw);
								} else {
									switch (lastEditedPadding) {
										case "top":
											setPaddingValue(
												topPadding,
												topPaddingUnit,
												topPaddingRaw
											);
											break;
										case "right":
											setPaddingValue(
												rightPadding,
												rightPaddingUnit,
												rightPaddingRaw
											);
											break;
										case "bottom":
											setPaddingValue(
												bottomPadding,
												bottomPaddingUnit,
												bottomPaddingRaw
											);
											break;
										case "left":
											setPaddingValue(
												leftPadding,
												leftPaddingUnit,
												leftPaddingRaw
											);
											break;
										default:
											if (topPadding) {
												setPaddingValue(
													topPadding,
													topPaddingUnit,
													topPaddingRaw
												);
											} else if (rightPadding) {
												setPaddingValue(
													rightPadding,
													rightPaddingUnit,
													rightPaddingRaw
												);
											} else if (bottomPadding) {
												setPaddingValue(
													bottomPadding,
													bottomPaddingUnit,
													bottomPaddingRaw
												);
											} else if (leftPadding) {
												setPaddingValue(
													leftPadding,
													leftPaddingUnit,
													leftPaddingRaw
												);
											} else {
												setAllPaddings(0);
												setAllPaddingUnits("px");
												setAllRawPaddings("");
											}
									}
								}
								this.setState({ lastEditedPadding: "" });
							}}
						/>
						<div className="ub-spacing-padding-unit-container">
							{["px", "em", "%"].map((u) => (
								<span
									onClick={() => {
										if (hasCommonPadding) {
											setAllPaddingUnits(u);
										} else {
											switch (lastEditedPadding) {
												case "top":
													setAttributes({ topPaddingUnit: u });
													break;
												case "right":
													setAttributes({ rightPaddingUnit: u });
													break;
												case "bottom":
													setAttributes({ bottomPaddingUnit: u });
													break;
												case "left":
													setAttributes({ leftPaddingUnit: u });
													break;
												default:
													setAllPaddingUnits(u);
											}
										}
									}}
									style={{
										fontWeight: topPaddingUnit === u ? "bold" : "normal",
									}}
								>
									{u}
								</span>
							))}
						</div>
						<div className="ub-spacing-panel">
							<input
								type="number"
								value={topPaddingRaw}
								min={0}
								onChange={(e) => {
									this.setState({ topPaddingRaw: e.target.value });
									setAttributes({ topPadding: Number(e.target.value) });
								}}
								onFocus={() => {
									if (!hasCommonPadding) {
										this.setState({ lastEditedPadding: "top" });
									}
								}}
							/>
							{!hasCommonPadding && (
								<>
									<input
										type="number"
										value={rightPaddingRaw}
										min={0}
										onChange={(e) => {
											this.setState({ rightPaddingRaw: e.target.value });
											setAttributes({ rightPadding: Number(e.target.value) });
										}}
										onFocus={() =>
											this.setState({ lastEditedPadding: "right" })
										}
									/>
									<input
										type="number"
										value={bottomPaddingRaw}
										min={0}
										onChange={(e) => {
											this.setState({ bottomPaddingRaw: e.target.value });
											setAttributes({ bottomPadding: Number(e.target.value) });
										}}
										onFocus={() =>
											this.setState({ lastEditedPadding: "bottom" })
										}
									/>
									<input
										type="number"
										value={leftPaddingRaw}
										min={0}
										onChange={(e) => {
											this.setState({ leftPaddingRaw: e.target.value });
											setAttributes({ leftPadding: Number(e.target.value) });
										}}
										onFocus={() => this.setState({ lastEditedPadding: "left" })}
									/>
								</>
							)}
							<button
								onClick={() => {
									setAllPaddings(0);
									setAllPaddingUnits("px");
									setAllRawPaddings("");
								}}
							>
								{__("Reset")}
							</button>
							{!hasCommonPadding && (
								<>
									<span>{__("Top")}</span>
									<span>{__("Right")}</span>
									<span>{__("Bottom")}</span>
									<span>{__("Left")}</span>
								</>
							)}
						</div>
					</>
				</PanelBody>
			</InspectorControls>
		);
	}
}
