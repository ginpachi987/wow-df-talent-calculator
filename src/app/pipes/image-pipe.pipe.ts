import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePipe'
})
export class ImagePipePipe implements PipeTransform {
  private betaServer: string = 'https://icons.wowdb.com/beta/medium/'
  private retailServer = 'https://icons.wowdb.com/retail/medium/'
  private yoroServer = 'https://projects.yoro.dev/df-talents/img/bg/'
  private retailImages = [
    "spell_progenitor_orb2",
    "ability_hunter_sentinelowl",
    "ability_hunter_razorwire",
    "ability_paladin_barrieroffaith",
    "ability_priest_innerlightandshadow",
    "ability_mage_arcanosphere",
    "ability_deathknight_shroudofwinter",
    "ability_druid_protectionofthegrove",
    "ability_druid_serenefocus",
    "ability_mage_scorchedearth",
    "ability_mage_icewall",
    "ability_monk_dematerialize",
    "ability_warlock_voidzone",
    "ability_warrior_deepcuts"
  ]

  transform(value: string, backround: boolean = false): string {
    if (!value) return ''
    value = value.toLowerCase()
    if (backround) return `url(${this.yoroServer}${value}.webp)`
    const server = this.retailImages.includes(value) ? this.retailServer : this.betaServer
    return `url(${server}${value}.jpg)`
  }

}
