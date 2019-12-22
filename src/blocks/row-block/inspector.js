// import CSS.
import './editor.scss';
import icons from "./icons/icons";
import map from "lodash/map";

// Setup the block
const { __ } = wp.i18n;

const {
    Component,
    Fragment,
} = wp.element;

const {
    MediaUpload,
    InspectorControls,
    ColorPalette,
} = wp.blockEditor || wp.editor;

const {
    Button,
    ButtonGroup,
    TabPanel,
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
} = wp.components;

export default class Inspector extends Component {
    constructor(){
        super( ...arguments );
    }

    render(){
        const {
            attributes: {
                colSection,
                columns,
                currentTab,
                mobileSizeGrid,
                tabletSizeGrid,
                selectUnits,
                marginTopWrap,
                marginBottomWrap,
                marginLeftWrap,
                marginRightWrap,
                paddingTopWrap,
                paddingBottomWrap,
                paddingLeftWrap,
                paddingRightWrap,
                gutter,
                wrapColor,
                wrapBorderColor,
                wrapBorderStyle,
                wrapBorderSize,
                wrapBorderRadius,
                wrapBackgroundSize,
                wrapBackgroundPosition,
                wrapBackgroundRepeat,
                wrapBackgroundAttachment,
                imgID,
                imgURL,
                imgAlt,
                videoID,
                videoURL,
                videoMuted,
                videoLoop,
                wrapBackgroundOverlay,
                wrapBackgroundOverlayCol,
                wrapTag,
                textColor,
            },
            setAttributes,
        } = this.props;

        const onTabSelect = ( tabName ) => {
            setAttributes( { currentTab: tabName } );
        };

        const mobileGridTwo = [
            { key: '-equal-two', icon: icons.twocol },
            { key: '-collapse-row', icon: icons.collapserow },
        ];

        const tabletGridTwo = [
            { key: '-equal-two', icon: icons.twocol },
            { key: '-collapse-row', icon: icons.collapserow },
        ];

        const mobileGridThree = [
            { key: '-equal-three', icon: icons.threecol },
            { key: '-first-row', icon: icons.firstrow },
            { key: '-last-row', icon: icons.lastrow },
            { key: '-collapse-row', icon: icons.collapserowthree },
        ];

        const tabletGridThree = [
            { key: '-equal-three', icon: icons.threecol },
            { key: '-first-row', icon: icons.firstrow },
            { key: '-last-row', icon: icons.lastrow },
            { key: '-collapse-row', icon: icons.collapserowthree },
        ];

        const mobileGridFour = [
            { key: '-equal-four', icon: icons.fourcol },
            { key: '-two-grid', icon: icons.grid },
            { key: '-collapse-row', icon: icons.collapserowfour },
        ];

        const tabletGridFour = [
            { key: '-equal-four', icon: icons.fourcol },
            { key: '-two-grid', icon: icons.grid },
            { key: '-collapse-row', icon: icons.collapserowfour },
        ];

        const mobileGridFive = [
            { key: '-equal-two', icon: icons.fivecol },
            { key: '-collapse-row', icon: icons.collapserowfive },
        ];

        const tabletGridFive = [
            { key: '-equal-two', icon: icons.fivecol },
            { key: '-collapse-row', icon: icons.collapserowfive },
        ];

        const mobileGridSix = [
            { key: '-equal-two', icon: icons.sixcol },
            { key: '-collapse-row', icon: icons.collapserowsix },
        ];

        const tabletGridSix = [
            { key: '-equal-two', icon: icons.sixcol },
            { key: '-collapse-row', icon: icons.collapserowsix },
        ];

        const columnTypeTwo = [
            { key: 'equal-two', col: 2, One: '50%', Two: '50%', icon: icons.twocol },
            { key: 'left-golden', col: 2, One: '66%', Two: '33%', icon: icons.twoleftgolden },
            { key: 'right-golden', col: 2, One: '33%', Two: '66%', icon: icons.tworightgolden },
        ];

        const columnTypeThree = [
            { key: 'equal-three', col: 3, One: '33%', Two: '33%', Three: '33%', icon: icons.threecol },
            { key: 'left-half', col: 3, One: '50%', Two: '25%', Three: '25%', icon: icons.lefthalf },
            { key: 'right-half', col: 3, One: '25%', Two: '25%', Three: '50%', icon: icons.righthalf },
            { key: 'center-half', col: 3, One: '25%', Two: '50%', Three: '25%', icon: icons.centerhalf },
            { key: 'center-wide', col: 3, One: '20%', Two: '60%', Three: '20%', icon: icons.widecenter },
            { key: 'center-exwide', col: 3, One: '15%', Two: '70%', Three: '15%', icon: icons.exwidecenter },
        ];

        const columnTypeFour = [
            { key: 'equal-four', col: 4, One: '25%', Two: '25%', Three: '25%', Four: '25%', icon: icons.fourcol },
            { key: 'left-forty', col: 4, One: '40%', Two: '20%', Three: '20%', Four: '20%', icon: icons.lfourforty },
            { key: 'right-forty', col: 4, One: '20%', Two: '20%', Three: '20%', Four: '40%', icon: icons.rfourforty },
        ];

        const columnTypeFive = [
            { key: 'equal-five', col: 5, One: '20%', Two: '20%', Three: '20%', Four: '20%', Five: '20%', icon: icons.fivecol },
        ];

        const columnTypeSix = [
            { key: 'equal-six', col: 6, One: '16,3%', Two: '16,3%', Three: '16,3%', Four: '16,3%', Six: '16,3%', icon: icons.sixcol },
        ];

        let selectTypeColumn;
        let mobileGrid;
        let tabletGrid;

        if( columns == 2 ){
            selectTypeColumn = columnTypeTwo;
            mobileGrid = mobileGridTwo;
            tabletGrid = tabletGridTwo;
        } else if ( columns == 3 ){
            selectTypeColumn = columnTypeThree;
            mobileGrid = mobileGridThree;
            tabletGrid = tabletGridThree;
        } else if ( columns == 4 ){
            selectTypeColumn = columnTypeFour;
            mobileGrid = mobileGridFour;
            tabletGrid = tabletGridFour;
        } else if ( columns == 5 ){
            selectTypeColumn = columnTypeFive;
            mobileGrid = mobileGridFive;
            tabletGrid = tabletGridFive;
        } else if ( columns == 6 ){
            selectTypeColumn = columnTypeSix;
            mobileGrid = mobileGridSix;
            tabletGrid = tabletGridSix;
        }

        const selectGrid = (props) => (
            <Fragment>
                <div className="ub-select-layout-grid">
                    <p>Select column type for column: {columns} </p>
                    <ButtonGroup aria-label={ __( 'Select Type Column' ) }>
                        { map( selectTypeColumn, ( { key, icon, col, One, Two, Three, Four } ) => (
                            <Button
                                key={ key }
                                className={ colSection === key ? `ub-section-btn-select` : `ub-section-btn` }
                                isSmall
                                onClick={ _ => setAttributes( {
                                    colSection: key,
                                    columns: col,
                                    colWidthOne: One,
                                    colWidthTwo: Two,
                                    colWidthThree: Three,
                                    colWidthFour: Four,
                                    inspectorTypeColumn: true,
                                } ) }
                            >
                                { icon }
                            </Button>
                        ) ) }
                    </ButtonGroup>
                    <TabPanel className="ub-inspect-tabs"
                              activeClass="active-tab"
                              initialTabName={ currentTab }
                              onSelect={ onTabSelect }
                              tabs={ [
                                  {
                                      name: 'tablet',
                                      title: 'Tablet',
                                      className: 'ub-tablet-tab',
                                  },
                                  {
                                      name: 'mobile',
                                      title: 'Mobile',
                                      className: 'ub-mobile-tab',
                                  },
                              ] }>
                        {
                            ( tab ) => {
                                let tabout;
                                if ( tab.name ) {
                                    if ( 'mobile' === tab.name ) {
                                        tabout = <ButtonGroup aria-label={ __( 'Select Type Column' ) }>
                                            { map( mobileGrid, ( { key, icon } ) => (
                                                <Button
                                                    key={ key }
                                                    className={ mobileSizeGrid === key ? `ub-section-btn-select` : `ub-section-btn` }
                                                    isSmall
                                                    onClick={ (props) => setAttributes( {
                                                        mobileSizeGrid: key,
                                                    } ) }
                                                >
                                                    { icon }
                                                </Button>
                                            ) ) }
                                        </ButtonGroup>
                                    } else if( 'tablet' === tab.name ) {
                                        tabout = <ButtonGroup aria-label={ __( 'Select Type Column' ) }>
                                            { map( tabletGrid, ( { key, icon } ) => (
                                                <Button
                                                    key={ key }
                                                    className={ tabletSizeGrid === key ? `ub-section-btn-select` : `ub-section-btn` }
                                                    isSmall
                                                    onClick={ (props) => setAttributes( {
                                                        tabletSizeGrid: key,
                                                    } ) }
                                                >
                                                    { icon }
                                                </Button>
                                            ) ) }
                                        </ButtonGroup>
                                    }
                                }
                                return <div>{ tabout }</div>;
                            }
                        }
                    </TabPanel>
                    <SelectControl
                        label={ __( 'Size Gutter' ) }
                        value={ gutter }
                        options={ [
                            { value: '0px', label: __( 'None 0px' ) },
                            { value: '4px', label: __( 'Small 4px' ) },
                            { value: '12px', label: __( 'Medium 12px' ) },
                            { value: '34px', label: __( 'Large 34px' ) },
                            { value: '88px', label: __( 'Huge 88px' ) },
                        ] }
                        onChange={ value => setAttributes( { gutter: value } ) }
                    />
                    <p>Space between each column.</p>
                </div>
            </Fragment>
        );

        const startSetting = (
            <Fragment>
                <PanelBody
                    title={ __( 'Margin | Padding | Border Wrap' ) }
                    initialOpen={ false }
                >
                    <div className="ub-layout-wrap-select-units">
                        <style>
                            { selectUnits == 'px' ? `.ub-layout-wrap-select-units .components-button-group .components-button:nth-child(1) { background: #f53d3d; border: 1px solid #f53d3d; border-radius: 5px; }` : '' }
                            { selectUnits == 'vh' ? `.ub-layout-wrap-select-units .components-button-group .components-button:nth-child(2) { background: #f53d3d; border: 1px solid #f53d3d; border-radius: 5px; }` : '' }
                            { selectUnits == '%' ? `.ub-layout-wrap-select-units .components-button-group .components-button:nth-child(3) { background: #f53d3d; border: 1px solid #f53d3d; border-radius: 5px; }` : '' }
                            { selectUnits == 'rem' ? `.ub-layout-wrap-select-units .components-button-group .components-button:nth-child(4) { background: #f53d3d; border: 1px solid #f53d3d; border-radius: 5px; }` : '' }
                            { selectUnits == 'em' ? `.ub-layout-wrap-select-units .components-button-group .components-button:nth-child(5) { background: #f53d3d; border: 1px solid #f53d3d; border-radius: 5px; }` : '' }
                        </style>
                        <p>Select units</p>
                        <ButtonGroup>
                            <Button
                                onClick = {(props) =>{
                                    setAttributes({
                                       selectUnits: 'px',
                                    });
                                }}
                            >
                                px
                            </Button>
                            <Button
                                onClick = { _ =>
                                    setAttributes({
                                        selectUnits: 'vh'
                                    })
                                }
                            >
                                vh
                            </Button>
                            <Button
                                onClick = { _ =>
                                    setAttributes({
                                        selectUnits: '%',
                                    })
                                }
                            >
                                %
                            </Button>
                            <Button
                                onClick = { _ =>
                                    setAttributes({
                                        selectUnits: 'rem',
                                    })
                                }
                            >
                                rem
                            </Button>
                            <Button
                                onClick = { _ =>
                                    setAttributes({
                                        selectUnits: 'em',
                                    })
                                }
                            >
                                em
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className="ub-layout-wrap_margin_box">
                        <div className="margin-st_box1">
                            <RangeControl
                               value={ marginTopWrap }
                               onChange={ value => 
                                   setAttributes({
                                       marginTopWrap: value
                                   })
                               }
                               min={ 0 }
                               max={ 100 }
                            />
                        </div>
                        <div className="margin-st_box2">
                            <div className="margin-col-1">
                                <RangeControl
                                    value={ marginLeftWrap }
                                    onChange={ value => 
                                        setAttributes({
                                            marginLeftWrap: value
                                        })
                                    }
                                    min={ 0 }
                                    max={ 100 }
                                />
                            </div>
                            <div className="margin-col-2">
                                <div className="padding-st_box1">
                                    <p>Padding</p>
                                    <RangeControl
                                        value={ paddingTopWrap }
                                        onChange={ value => 
                                            setAttributes({
                                                paddingTopWrap: value
                                            })
                                        }
                                        min={ 0 }
                                        max={ 100 }
                                    />
                                </div>
                                <div className="padding-st_box2">
                                    <div className="padding-col-1">
                                        <RangeControl
                                            value={ paddingLeftWrap }
                                            onChange={ value => 
                                                setAttributes({
                                                    paddingLeftWrap: value
                                                })
                                            }
                                            min={ 0 }
                                            max={ 100 }
                                        />
                                    </div>
                                    <div className="padding-col-2">
                                        <p>Content</p>
                                    </div>
                                    <div className="padding-col-3">
                                        <RangeControl
                                            value={ paddingRightWrap }
                                            onChange={ value => 
                                                setAttributes({
                                                    paddingRightWrap: value
                                                })
                                            }
                                            min={ 0 }
                                            max={ 100 }
                                        />
                                    </div>
                                </div>
                                <div className="padding-st_box3">
                                    <RangeControl
                                        value={ paddingBottomWrap }
                                        onChange={ value => 
                                            setAttributes({
                                                paddingBottomWrap: value
                                            })
                                        }
                                        min={ 0 }
                                        max={ 100 }
                                    />
                                </div>
                            </div>
                            <div className="margin-col-3">
                                <RangeControl
                                    value={ marginRightWrap }
                                    onChange={ value => 
                                        setAttributes({
                                            marginRightWrap: value
                                        })
                                    }
                                    min={ 0 }
                                    max={ 100 }
                                />
                            </div>
                        </div>
                        <div className="margin-st_box3">
                            <RangeControl
                               value={ marginBottomWrap }
                               onChange={ value => 
                                   setAttributes({
                                       marginBottomWrap: value
                                   })
                               }
                               min={ 0 }
                               max={ 100 }
                            />
                        </div>
                    </div>
                    <p>Border Color</p>
                    <ColorPalette
                        value={ wrapBorderColor }
                        onChange={ value =>
                            setAttributes({
                                wrapBorderColor: value
                            })
                        }
                        allowReset
                    />
                    <SelectControl
                        label={ __( 'Border Style' ) }
                        value={ wrapBorderStyle }
                        options={ [
                            { value: 'none', label: __( 'None' ) },
                            { value: 'solid', label: __( 'Solid' ) },
                            { value: 'dotted', label: __( 'Dotted' ) },
                            { value: 'dashed', label: __( 'Dashed' ) },
                            { value: 'double', label: __( 'Double' ) },
                            { value: 'groove', label: __( 'Groove' ) },
                            { value: 'ridge', label: __( 'Ridge' ) },
                            { value: 'inset', label: __( 'Inset' ) },
                            { value: 'Outset', label: __( 'Outset' ) },
                        ] }
                        onChange={ value => setAttributes( { wrapBorderStyle: value } ) }
                    />
                    <RangeControl
                        label = {__( 'Border Size' )}
                        value={ wrapBorderSize }
                        onChange={ value => 
                            setAttributes({
                                wrapBorderSize: value
                            })
                        }
                        min={ 0 }
                        max={ 50 }
                    />
                    <RangeControl
                        label = {__( 'Border Radius' )}
                        value={ wrapBorderRadius }
                        onChange={ value => 
                            setAttributes({
                                wrapBorderRadius: value
                            })
                        }
                        min={ 0 }
                        max={ 50 }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Background Setting Wrap' ) }
                    initialOpen={ false }
                >
                    <p>Background Color</p>
                    <ColorPalette
                        value={wrapColor}
                        onChange={ value =>
                            setAttributes({ wrapColor: value })
                        }
                        allowReset
                    />
                    <p>Background Image</p>
                    <div className="ub-image-inspector-panel">
                    { imgURL ? (
                        <Fragment>
                            <img src={imgURL} id={imgID} alt={imgAlt}/>
                            <Button
                                className="components-button button button-medium"
                                onClick = {_ => 
                                      setAttributes({
                                          imgURL: '',
                                          imgID: '',
                                          imgAlt: '',
                                      })
                                }
                            >
                            Delete Image
                            </Button>
                            <SelectControl
                                label={ __( 'Background Image Size' ) }
                                value={ wrapBackgroundSize }
                                options={ [
                                    { value: 'cover', label: __( 'Cover' ) },
                                    { value: 'contain', label: __( 'Contain' ) },
                                    { value: 'auto', label: __( 'Auto' ) },
                                ] }
                                onChange={ value => setAttributes( { wrapBackgroundSize: value } ) }
                            />
                            <SelectControl
                                label={ __( 'Background Image Position' ) }
                                value={ wrapBackgroundPosition }
                                options={ [
                                    { value: 'center top', label: __( 'Center Top' ) },
                                    { value: 'center center', label: __( 'Center Center' ) },
                                    { value: 'center bottom', label: __( 'Center Bottom' ) },
                                    { value: 'left top', label: __( 'Left Top' ) },
                                    { value: 'left center', label: __( 'Left Center' ) },
                                    { value: 'left bottom', label: __( 'Left Bottom' ) },
                                    { value: 'right top', label: __( 'Right Top' ) },
                                    { value: 'right center', label: __( 'Right Center' ) },
                                    { value: 'right bottom', label: __( 'Right Bottom' ) },
                                ] }
                                onChange={ value => setAttributes( { wrapBackgroundPosition: value } ) }
                            />
                            <SelectControl
                                label={ __( 'Background Image Repeat' ) }
                                value={ wrapBackgroundRepeat }
                                options={ [
                                    { value: 'no-repeat', label: __( 'No Repeat' ) },
                                    { value: 'repeat', label: __( 'Repeat' ) },
                                    { value: 'repeat-x', label: __( 'Repeat-x' ) },
                                    { value: 'repeat-y', label: __( 'Repeat-y' ) },
                                ] }
                                onChange={ value => setAttributes( { wrapBackgroundRepeat: value } ) }
                            />
                            <SelectControl
                                label={ __( 'Background Image Attachment' ) }
                                value={ wrapBackgroundAttachment }
                                options={ [
                                    { value: 'scroll', label: __( 'Scroll' ) },
                                    { value: 'fixed', label: __( 'Fixed' ) },
                                ] }
                                onChange={ value => setAttributes( { wrapBackgroundAttachment: value } ) }
                            />
                        </Fragment>
                    ) : (
                        <MediaUpload
                            onSelect={img =>
                                setAttributes({
                                    imgID: img.id,
                                    imgURL: img.url,
                                    imgAlt: img.alt
                                })
                            }
                            type="image"
                            value={imgID}
                            render={({open}) => (
                                <Button
                                    className="components-button button button-medium"
                                    onClick={open}
                                >
                                    {__('Upload Image')}
                                </Button>
                            )}
                        />
                    )}
                    </div>
                    <p>Background Video</p>
                    <div className="ub-video-inspector-panel">
                        { videoURL ? (
                            <Fragment>
                                <video
                                    autoplay loop muted id={videoID} src={videoURL}
                                >
                                </video>
                                <Button
                                    className="components-button button button-medium"
                                    onClick = {_ => 
                                        setAttributes({
                                            videoURL: '',
                                            videoID: '',
                                        })
                                    }
                                >
                                    Delete Video
                                </Button>
                                <ToggleControl
                                    label={ __( 'Mute Video' ) }
                                    checked={ videoMuted }
                                    onChange={ ( videoMuted ) => 
                                        setAttributes ({
                                            videoMuted,
                                        })
                                    }
                                />
                                <ToggleControl
                                     label={ __( 'Loop Video' ) }
                                     checked={ videoLoop }
                                     onChange={ ( videoLoop ) => 
                                         setAttributes ({
                                             videoLoop
                                         })
                                     }
                                />
                            </Fragment>
                        ) : (
                            <MediaUpload
                                onSelect={ video =>
                                    setAttributes({
                                        videoID: video.id,
                                        videoURL: video.url,
                                    })
                                }
                                type="video"
                                allowedTypes={ [ 'video' ] }
                                value={ videoID }
                                render={({open}) => (
                                    <Button
                                        className="components-button button button-medium"
                                        onClick={open}
                                    >
                                        {__('Upload Video')}
                                    </Button>
                                )}
                            />
                        )}
                    </div>
                </PanelBody>
                <PanelBody
                    title={ __( 'Background Overlay Setting' ) }
                    initialOpen={ false }
                >
                    <p>Overlay Opacity</p>
                    <RangeControl
                        value={ wrapBackgroundOverlay }
                        onChange={ value => {
                            setAttributes({
                                wrapBackgroundOverlay: value
                            });
                        }}
                        min={ 0 }
                        max={ 100 }
                    />
                    <p>Overlay Color</p>
                    <ColorPalette
                        value={ wrapBackgroundOverlayCol }
                        onChange={ value =>
                            setAttributes({ wrapBackgroundOverlayCol: value })
                        }
                        allowReset
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Stucture Setting' ) }
                    initialOpen={ false }
                >
                    <SelectControl
                        label={ __( 'Wrap HTML tag' ) }
                        value={ wrapTag }
                        options={ [
                            { value: 'div', label: __( 'div' ) },
                            { value: 'header', label: __( 'header' ) },
                            { value: 'section', label: __( 'section' ) },
                            { value: 'article', label: __( 'article' ) },
                            { value: 'main', label: __( 'main' ) },
                            { value: 'aside', label: __( 'aside' ) },
                            { value: 'footer', label: __( 'footer' ) },
                        ] }
                        onChange={ value => setAttributes( { wrapTag: value } ) }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Text Color Setting' ) }
                    initialOpen={ false }
                >
                    <p>Text Color</p>
                    <ColorPalette
                        value={ textColor }
                        onChange={ value =>
                            setAttributes({ textColor: value })
                        }
                        allowReset
                    />
                </PanelBody>
            </Fragment>
        );

        return[
            <Fragment>
                <InspectorControls>
                    {selectGrid}
                </InspectorControls>
                <InspectorControls>
                    {startSetting}
                </InspectorControls>
            </Fragment>
        ]
    }
}