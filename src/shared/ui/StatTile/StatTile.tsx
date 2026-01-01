import './StatTile.css'

type StatTileProps = {
  label: string
  value: number | string
}

export const StatTile = ({ label, value }: StatTileProps) => (
  <div className="stat-tile">
    <div className="stat-tile__value">{value}</div>
    <div className="stat-tile__label">{label}</div>
  </div>
)
