import { post } from './../../utils/request';

export const login = async values => post('/mini/dev_login.xhtml', values);
export const logout = async values => post('/mini/dev_logOut.xhtml', values);
