import request from '@/utils/request';

export interface NoticeParamsType {
  title: string;
  content: string;
  isStick: boolean;
  isImportant: boolean;
}

export async function fetchNotice() {
  return request(`/api/manager/notices`);
}

export async function deleteNotice(noticeId: number) {
  return request(`/api/manager/notices/${noticeId}`, {
    method: 'DELETE',
  });
}

export async function editNotice(noticeId: number, params: NoticeParamsType) {
  return request(`/api/manager/notices/${noticeId}`, {
    method: 'PUT',
    data: params,
  });
}

export async function addNotice(params: NoticeParamsType) {
  return request('/api/manager/notices', {
    method: 'POST',
    data: params,
  });
}
