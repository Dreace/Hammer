import request from '@/utils/request';


export async function getLog() {
  return request(`/api/dashboard/log`);
}
