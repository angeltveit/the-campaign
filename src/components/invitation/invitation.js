import { Component, Template, Attribute } from '@scoutgg/widgets'
import { loadInvite, join } from '../../services/campaign'
import { io } from '../../services/socket-io'

import template from './invitation.pug'

@Component('campaign')
@Attribute('invite', String)
@Template(template)
export default class Invitation extends HTMLElement {
  async connectedCallback() {

    io.on('player', async () => {
      if(this.state === 'welcome') return
      const { players } = await loadInvite(this.invite)
      this.players = players
      this.next()
      this.render()
    })

    window.addEventListener('focus', async () => {
      if(this.state === 'welcome') return
      const { players } = await loadInvite(this.invite)
      this.players = players
      this.next()
    });

    this.music = new Audio('tron.mp3')
    const { players, you } = await loadInvite(this.invite)
    this.players = players
    this.you = you
    this.state = 'welcome'
    this.render()
  }
  enter() {
    this.music.play()
    this.entered = true
    this.next()
  }
  setNickname(e) {
    const el = this.shadowRoot.querySelector('input.nickname')
    if(!el) return
    this.nickname = el.value
  }
  async join() {
    const data = await join({ invite: this.invite, nickname: this.nickname })
    const { players, you } = await loadInvite(this.invite)
    this.players = players
    this.you = you
    this.next()
  }
  next() {
    if(this.players.length >= 13 && this.you) {
      this.state = 'done'
    } else if(this.you) {
      this.state = 'rank'
    } else if(this.entered) {
      this.state = 'join'
    } else {
      this.state = 'welcome'
    }
    this.render()
  }
}
