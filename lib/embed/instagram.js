import {defineElement, height, parseHostname} from '../util'
import Embed from '../embed'
import Observable from '../observable'

// eslint-disable-next-line
const CSS = require('!css-loader!postcss-loader!sass-loader!./instagram.scss').toString()

class Instagram extends Observable(Embed) {
  constructor(status, parent) {
    super()
    if (status) this.setAttribute('status', status)
    this.parent = parent
  }

  static get css() {
    return CSS
  }

  get url() {
    let id = this.getAttribute('id')
    id = id.substr(0, id.indexOf('?'));
    return this._api(`/instagram/${id}`)
  }

  get authorName() {
    return this._data.author_name
  }

  get authorUrl() {
    return this._data.author_url
  }

  get postUrl() {
    return `https://instagr.am/p/${this._data.author_url}`
  }

  get imageUrl() {
    return `${this.url}-poster-image`
  }

  get title() {
    return this._data.title
  }

  get width() {
    return this._data.width
  }

  static get template() {
    return `
    <style>${CSS}</style>
    <div style="background: #fff; border-radius: 5px; border: 1px solid #e6e6e6; width: {{ width }}; font-size: 14px; font-family: Verdana; box-shadow: 0px 0px 5px rgba(0,0,0,0.1);">
    <header style="border-bottom: 1px solid #efefef; padding: 16px;">
    <div style="background:#F8F8F8; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); background-position: center; background-repeat: no-repeat; width: 32px; height: 32px; border-radius: 32px; border: 1px solid #efefef; background-size: 50%; float: left;"></div>
    <div style="margin-left: 40px;">
    <a style="font-weight: 600; color: #262626; text-decoration: none; padding: 0px 8px; display: block;" href="{{ authorUrl }}" target="_blank">{{ authorName }}</a>
    <a style="text-decoration: none; padding: 0px 8px; font-size: 12px;" href="{{ postUrl }}" target="_blank">Instagram</a>
    </div>
    <div style="clear: both;"></div>
    </header>
    <a href="{{ postUrl }}" target="_blank"><img style="width: 100%;" src="{{ imageUrl }}"></a>
    <div style="border-top: 1px solid #efefef; padding: 16px;">
    <a style="font-weight: 600; color: #262626; text-decoration: none;" href="{{ authorUrl }}" target="_blank">{{ authorName }}</a> {{ title }}
    <time style="display: block; margin-top: 20px; color: #bbb; font-size: 12px;">Time</time>
    </div>
    </div>
    `
  }
}

defineElement('embetty-instagram', Instagram)
