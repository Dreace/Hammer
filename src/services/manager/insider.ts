import request from '@/utils/request';

export interface InsiderParamsType {
  openId: string;
  key: string;
  expireAt: number;
  status: number;
}

export async function fetchInsider() {
  return request(`/api/manager/insiders`);
}

export async function deleteInsider(insiderId: string) {
  return request(`/api/manager/insiders/${insiderId}`, {
    method: 'DELETE',
  });
}

export async function editInsider(insiderId: string, params: InsiderParamsType) {
  return request(`/api/manager/insiders/${insiderId}`, {
    method: 'PUT',
    data: params,
  });
}

export async function addInsider(params: InsiderParamsType) {
  return request('/api/manager/insiders', {
    method: 'POST',
    data: params,
  });
}
