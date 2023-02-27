import React from 'react'
import { Dropdown } from 'react-bootstrap'
// @ts-expect-error TS(6142): Module './ColorSchemePreview' was resolved to '/Us... Remove this comment to see the full error message
import ColorSchemePreview from './ColorSchemePreview'
import {
  colorPresets,
  getColorDomain,
  getPresetScale
// @ts-expect-error TS(7016): Could not find a declaration file for module '@raw... Remove this comment to see the full error message
} from '@rawgraphs/rawgraphs-core'
// @ts-expect-error TS(2307): Cannot find module '../ChartOptions.module.scss' o... Remove this comment to see the full error message
import styles from '../ChartOptions.module.scss'

const ColorSchemesDropDown = ({
  interpolators,
  interpolator,
  setInterpolator,

  // To display color-scale preview
  colorDataset,

  colorDataType,
  scaleType,
  currentFinalScale
}: any) => {

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Dropdown className="d-inline-block raw-dropdown w-100">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Dropdown.Toggle variant="white" className="w-100" style={{paddingRight:24}} disabled={!colorDataType}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        { currentFinalScale && <ColorSchemePreview
          scale={currentFinalScale}
        />}
      </Dropdown.Toggle>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      {colorDataType && <Dropdown.Menu className="w-100">
      {interpolators.map(
        (intrplr: any) => {
          return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Dropdown.Item key={intrplr} onClick={()=>setInterpolator(intrplr)} className={styles["color-scheme-dropdown-item"]}>
              { colorDataset[0] && colorPresets[scaleType][interpolator] && 
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <ColorSchemePreview
                  scale={
                    getPresetScale(scaleType, getColorDomain(colorDataset, colorDataType, scaleType), intrplr)
                  }
                  label={intrplr}
                />
              }
            </Dropdown.Item>
          )
        }
      )}
      </Dropdown.Menu>}
    </Dropdown>
  );
}

export default React.memo(ColorSchemesDropDown)