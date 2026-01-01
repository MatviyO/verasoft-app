import './DotsLoader.scss'

export const DotsLoader = () => (
  <div className="dots-loader" role="status" aria-label="Loading">
    <span className="dots-loader__glyph" aria-hidden="true">
      ...
    </span>
  </div>
)
