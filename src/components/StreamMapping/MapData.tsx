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
      </svg>
    </>
  )
}
