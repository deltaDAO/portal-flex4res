import { VsmData } from './_types'

export default function MapData(props: VsmData) {
  const {
    saegen,
    drehen,
    fraesen,
    waschen,
    messen,
    vormontage,
    endMontageD40,
    endMontageD25,
    funktionspruefung,
    verpackung
  } = props
  return (
    <>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 4667 2197"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeMiterlimit: 10
        }}
      >
        <g transform="matrix(1.33333,0,0,1.33333,0,0)">
          <text
            x="416.378px"
            y="998.02px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36.024px'
            }}
          >
            {saegen.zzD40 || ''}s
          </text>
          <text
            x="338.53px"
            y="1047.65px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {saegen.rz || ''} {''}
            <tspan
              style={{
                fontFamily: "'ArialMT', 'Arial', sans-serif",
                fontSize: '24px'
              }}
            >
              {saegen.kommentar || ''}
            </tspan>
          </text>
          <text
            x="361.102px"
            y="1097.26px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {saegen.oee || ''} %
          </text>
          <text
            x="418.886px"
            y="898.8px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {saegen.bzD40 || ''}s
          </text>
          <text
            x="416.29px"
            y="948.43px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {saegen.zzD25 || ''}s
          </text>
          <text
            x="450.129px"
            y="1146.86px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {saegen.schichten || ''}
          </text>
          <text
            x="339.64px"
            y="1196.47px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {saegen.lg || ''}Stück
          </text>
          <text
            x="418.696px"
            y="852.36px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {saegen.bzD25 || ''}s
          </text>
        </g>
        <g transform="matrix(1.33333,0,0,1.33333,0,0)">
          <text
            x="872.314px"
            y="308.88px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {drehen.pz || ''}s
          </text>
          <text
            x="870.55px"
            y="354.82px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {drehen.zz || ''}s
          </text>
          <text
            x="827.53px"
            y="402.72px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {drehen.rz || ''}s{' '}
            <tspan
              style={{
                fontFamily: "'ArialMT', 'Arial', sans-serif",
                fontSize: '24px'
              }}
            >
              {drehen.kommentar || ''}
            </tspan>
          </text>
          <text
            x="850.102px"
            y="452.33px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {drehen.oee || ''} %
          </text>
          <text
            x="940.432px"
            y="501.94px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {drehen.schichten || ''}
          </text>
          <text
            x="829.007px"
            y="601.154px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36.024px'
            }}
          >
            {drehen.lg || ''}Stück
          </text>
          <text
            x="840.526px"
            y="551.57px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {drehen.pm || ''}Stück
          </text>
        </g>
        <g transform="matrix(1.33333,0,0,1.33333,0,0)">
          <text
            x="906.964px"
            y="850.78px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {fraesen.pzD25 || ''}s
          </text>
          <text
            x="906.964px"
            y="898.8px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {fraesen.pzD40 || ''}s
          </text>
          <text
            x="905.2px"
            y="948.43px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {fraesen.zzD25 || ''}s
          </text>
          <text
            x="905.288px"
            y="998.024px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36.024px'
            }}
          >
            {fraesen.zzD40 || ''}s
          </text>
          <text
            x="827.44px"
            y="1047.65px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {fraesen.rz || ''}{' '}
            <tspan
              style={{
                fontFamily: "'ArialMT', 'Arial', sans-serif",
                fontSize: '24px'
              }}
            >
              {fraesen.kommentar || ''}
            </tspan>
          </text>
          <text
            x="850.012px"
            y="1097.26px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {fraesen.oee || ''} %
          </text>
          <text
            x="940.208px"
            y="1146.86px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {fraesen.schichten || ''}
          </text>
          <text
            x="840.436px"
            y="1196.47px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {fraesen.pm || ''}Stück
          </text>
          <text
            x="828.88px"
            y="1246.08px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {fraesen.lg || ''}Stück
          </text>
        </g>
        <g transform="matrix(1.33333,0,0,1.33333,0,0)">
          <text
            x="1454.64px"
            y="742.2px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {waschen.zz || ''}s
          </text>
          <text
            x="1570.11px"
            y="807.38px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {waschen.schichten || ''}
          </text>
          <text
            x="1530.36px "
            y="872.59px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {waschen.ruesten || ''}
          </text>
          <text
            x="1458.78px"
            y="937.8px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {waschen.lg || ''}Stück
          </text>
        </g>
        <g transform="matrix(1.33333,0,0,1.33333,0,0)">
          <text
            x="1900.02px "
            y="1000.8px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {messen.schichten || ''}
          </text>
          <text
            x="1786.69px"
            y="1065.55px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '30px'
            }}
          >
            {messen.lg || ''}Stück
          </text>
          <text
            x="1807.17px"
            y="740.98px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '27.96px'
            }}
          >
            {messen.ks.bz || ''}s
          </text>
          <text
            x="1920.61px "
            y="740.98px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '27.96px'
            }}
          >
            {messen.ks.zz || ''}s
          </text>
          <text
            x="1825.32px"
            y="804.74px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '27.96px'
            }}
          >
            {messen.d25.bz || ''}s
          </text>
          <text
            x="1923.71px"
            y="804.74px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '27.96px'
            }}
          >
            {messen.d25.zz || ''}s
          </text>
          <text
            x="1825.32px"
            y="868.54px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '27.96px'
            }}
          >
            {messen.d40.bz || ''}s
          </text>
          <text
            x="1923.71px"
            y="868.54px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '27.96px'
            }}
          >
            {messen.d40.zz || ''}s
          </text>
          <text
            x="1773.37px"
            y="932.33px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '27.96px'
            }}
          >
            {messen.rz || ''}s {''}
            <tspan
              style={{
                fontFamily: "'ArialMT', 'Arial', sans-serif",
                fontSize: '24px'
              }}
            >
              {messen.kommentar || ''}
            </tspan>
          </text>
        </g>
        <g transform="matrix(1.33333,0,0,1.33333,0,0)">
          <text
            x="2111.14px"
            y="740.66px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {vormontage.pz || ''}s
          </text>
          <text
            x="2225.85px "
            y="871.42px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {vormontage.schichten || ''}
          </text>
          <text
            x="2113.52px"
            y="936.96px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {vormontage.lg || ''}Stück
          </text>
          <text
            x="2109.38px"
            y="806.21px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {vormontage.zz || ''}s
          </text>
        </g>
        <g transform="matrix(1.33333,0,0,1.33333,0,0)">
          <text
            x="2518.2px"
            y="358.3px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {endMontageD40.pz || ''}s
          </text>
          <text
            x="2550.45px "
            y="485.86px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {endMontageD40.schichten || ''}
          </text>
          <text
            x="2440.12px"
            y="549.65px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {endMontageD40.lg || ''}Stück
          </text>
          <text
            x="2516.22px"
            y="422.06px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {endMontageD40.zz || ''}s
          </text>
        </g>
        <g transform="matrix(1.33333,0,0,1.33333,0,0)">
          <text
            x="2516.44px"
            y="806.21px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {endMontageD25.zz || ''}s
          </text>
          <text
            x="2550.45px "
            y="870.94px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {endMontageD25.schichten || ''}
          </text>
          <text
            x="2440.12px"
            y="936.14px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {endMontageD25.lg || ''}Stück
          </text>
          <text
            x="2518.2px"
            y="742.2px"
            style={{
              fontFamily: "'ArialMT', 'Arial', sans-serif",
              fontSize: '36px'
            }}
          >
            {endMontageD25.pz || ''}s
          </text>
        </g>
      </svg>
    </>
  )
}
