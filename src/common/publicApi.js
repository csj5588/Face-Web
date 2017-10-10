import { get } from './../utils/request';

export const getAddress = async values => get('/mini/dev_selectZone.xhtml', values);

export const getUserInfo = async values => get('/mini/isLogin.xhtml', values);

export const getParsPrice = async values => get('/mini/dev_Calculate.xhtml', values); // 计算配件金额

export const checkPhone = async values => get('/mini/dev_HaveMbl.xhtml', values); // 验证手机号是否

