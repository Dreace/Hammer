import request from '@/utils/request';

export interface SlideParamsType {
  index: number;
  name: string;
  imageUrl: string;
  content: string;
}

export async function fetchSlide() {
  return request(`/api/manager/slides`);
}

export async function deleteSlide(slideId: number) {
  return request(`/api/manager/slides/${slideId}`, {
    method: 'DELETE',
  });
}

export async function editSlide(slideId: number, params: SlideParamsType) {
  return request(`/api/manager/slides/${slideId}`, {
    method: 'PUT',
    data: params,
  });
}

export async function addSlide(params: SlideParamsType) {
  return request('/api/manager/slides', {
    method: 'POST',
    data: params,
  });
}
