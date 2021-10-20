import axios from 'axios'
import { API_URL } from '@/configs/api'

export const getOKPDsList = async (search) => axios.get(API_URL + `/okpd2?filter[code]=${search}`)

export const getFieldData = async () => axios.get(API_URL + '/orders/entities')

export const getMembersList = async (search) =>  axios.get(API_URL + `/organisations?filter[full_name]=${search}`)

export const getParticipantsList = async (search) =>  axios.get(API_URL + `/participants?filter[full_name]=${search}`)

export const getTendersList = async (payload, page) => axios.post(API_URL + `/orders/search?page=${page}`, transformPayload(payload))

const transformPayload = (payload) => {
  const relations = ['region', 'organisation', 'etp', 'placing_way', 'state', 'attachments', 'events'].join(',')

  for (const item in payload.filter) {
    if (Array.isArray(payload.filter[item])) {
      payload.filter[item] = payload.filter[item].join(',')
    }
  }

  payload.include = relations

  return payload

}