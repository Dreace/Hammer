import request from '@/utils/request';

export interface RoleParamsType {
  name: string,
  chineseName: string,
  description: string
}

export async function fetchRole() {
  return request(`/api/manager/authorities`);
}

export async function deleteRole(id: number) {
  return request(`/api/manager/authorities/${id}`, {
    method: 'DELETE',
  });
}

export async function editRole(id: number, params: RoleParamsType) {
  return request(`/api/manager/authorities/${id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function addRole(params: RoleParamsType) {
  return request('/api/manager/authorities', {
    method: 'POST',
    data: params,
  });
}
