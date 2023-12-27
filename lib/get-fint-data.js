const { TEST_FEIDENAVN } = require('../config')
const { fintGraph } = require('./call-fint')

const getFaggrupper = async (feidenavn) => {
  // Check if we need testdata
  if (TEST_FEIDENAVN.includes(feidenavn)) {
    return [
      {
        id: '12473601',
        groupId: 'TULL:B2/KØDD3035',
        type: 'faggruppe',
        name: 'B2/KØDD3035',
        description: 'Faggruppe B2/KØDD3035 ved Tull videregående skole',
        schoolId: '38018',
        schoolName: 'Tull videregående skole',
        grep: {
          id: '7f0681ae-3b27-4f0e-98b3-34c94c8d7c8f',
          kode: 'KØDD3035',
          url: 'http://psi.udir.no/kl06/KØDD3035',
          data_url: 'https://data.udir.no/kl06/v201906/fagkoder/KØDD3035',
          tittel: {
            default: 'Master i å slå seg sammen for så å splittes igjen',
            nob: 'Master i å slå seg sammen for så å splittes igjen',
            nno: 'Master i å slå seg sammen for så å splittes igjen',
            eng: 'Master i å slå seg sammen for så å splittes igjen',
            sme: 'Master i å slå seg sammen for så å splittes igjen'
          },
          kortform: {
            default: 'Idioti',
            nob: 'Idioti',
            nno: 'Idioti',
            eng: 'Idioti',
            sme: 'Idioti'
          }
        },
        updatedAt: '2023-09-25T14:02:23.647Z'
      }
    ]
  }
  const query = {
    query: `
      query {
        elev(feidenavn: "${feidenavn}") {
          elevforhold {
            skole {
              skolenummer {
                identifikatorverdi
              }
              navn
              organisasjonsnavn
              organisasjon {
                kortnavn
              }
            }
            faggruppemedlemskap {
              faggruppe {
                systemId {
                  identifikatorverdi
                }
                navn
                fag {
                  navn
                  beskrivelse
                  grepreferanse
                  systemId {
                    identifikatorverdi
                  }
                }
              }
            }
          }
        }
      }`
  }
  const vfkFintData = await fintGraph(query, 'VFK')
  const tfkFintData = await fintGraph(query, 'TFK')

  // repack to match pifu data (dirty solution 👹)

  /* Example pifu data
  {
    "_id": "651192f51300ff24cb2a98fc",
    "id": "12473601",
    "groupId": "POV:B2/REA3035",
    "type": "undervisningsgruppe",
    "name": "B2/REA3035",
    "description": "Undervisningsgruppe B2/REA3035 ved Porsgrunn videregående skole",
    "schoolId": "38018",
    "schoolName": "Porsgrunn videregående skole",
    "validFrom": "2023-08-01",
    "validTo": "2024-07-31",
    "adminPeriod": "2023/2024",
    "grep": {
      "id": "7f0681ae-3b27-4f0e-98b3-34c94c8d7c8f",
      "kode": "REA3035",
      "url": "http://psi.udir.no/kl06/REA3035",
      "data_url": "https://data.udir.no/kl06/v201906/fagkoder/REA3035",
      "tittel": {
        "default": "Biologi 1",
        "nob": "Biologi 1",
        "nno": "Biologi 1",
        "eng": "Biology 1",
        "sme": "Biologiija 1"
      },
      "kortform": {
        "default": "Biologi 1",
        "nob": "Biologi 1",
        "nno": "Biologi 1",
        "eng": "Biology 1",
        "sme": "Biologiija 1"
      }
    },
    "updatedAt": "2023-09-25T14:02:23.647Z"
  }

  repack bruker slik som under, så trenger bare de :)
  const { grep, id, type, groupId, name, schoolId, schoolName, students (utgår her), teachers (utgår her) } = group
  const { kode, tittel, kortform, data_url: dataUrl } = grep

  */

  let faggrupper = []
  const vfkElevforhold = vfkFintData.data.elev?.elevforhold || []
  const tfkElevfhorhold = tfkFintData.data.elev?.elevforhold || []
  const bothElevforhold = [...vfkElevforhold, ...tfkElevfhorhold]
  for (const elevforhold of bothElevforhold) {
    const repackedFag = elevforhold.faggruppemedlemskap.map(medlemskap => {
      // repack to match pifu data
      const kortnavn = elevforhold.skole.organisasjon.kortnavn.startsWith('OF-') ? elevforhold.skole.organisasjon.kortnavn.replace('OF-', '') : elevforhold.skole.organisasjon.kortnavn // Make it match pifu data
      const faggruppe = medlemskap.faggruppe
      const faggruppeInfo = {
        id: faggruppe.systemId.identifikatorverdi,
        type: 'faggruppe',
        name: faggruppe.navn,
        groupId: `${kortnavn}:${faggruppe.navn}`,
        schoolId: elevforhold.skole.skolenummer.identifikatorverdi,
        schoolName: elevforhold.skole.navn
      }
      const grep = {
        kode: faggruppe.fag.systemId.identifikatorverdi,
        tittel: {
          default: faggruppe.fag.beskrivelse || faggruppe.fag.navn,
          nob: faggruppe.fag.beskrivelse || faggruppe.fag.navn,
          nno: faggruppe.fag.beskrivelse || faggruppe.fag.navn, // I am so sorry nynorsk
          eng: faggruppe.fag.beskrivelse || faggruppe.fag.navn, // I am so sorry english
          sme: faggruppe.fag.beskrivelse || faggruppe.fag.navn // I am so sorry samisk - i do not have the time... next version :(
        },
        kortform: {
          default: faggruppe.fag.navn,
          nob: faggruppe.fag.navn,
          nno: faggruppe.fag.navn, // I am so sorry nynorsk
          eng: faggruppe.fag.navn, // I am so sorry english
          sme: faggruppe.fag.navn // I am so sorry samisk - i do not have the time... next version :(
        },
        data_url: Array.isArray(faggruppe.fag.grepreferanse) && faggruppe.fag.grepreferanse.length > 0 ? faggruppe.fag.grepreferanse[0] : 'https://erdetnoensombrukerdettefeltet.no/Whattttttdoyoumean' // Will there be errors here - time will show
      }
      return {
        ...faggruppeInfo,
        grep
      }
    })
    faggrupper = [...faggrupper, ...repackedFag] // In case of several schools - we iterate elevforhold
  }
  return faggrupper
}

module.exports = { getFaggrupper }
