import Axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';

export const $get = (url, config) => {
    return new Promise((resolve, reject) => {
        let { param, responseType } = config;
        Axios.get(url, {
            params: {
                ...param,
                _t: Date.now()
            },
            responseType
        }).then((res) => {
            if (res.status == 200) {
                resolve(res.data);
            } else {
                reject(res);
            }
        }).catch((mes) => {
            showMessage();
            reject(mes);
        })
    })
}

export const $post = (url, config) => {
    return new Promise((resolve, reject) => {
        let { param, type } = config;
        let dataType = Object.prototype.toString.call(param);
        // post formData
        if (type) {
            switch (type) {
                case 'form':
                    /**
                     * qs.stringify(param, option)
                     * option.arrayFormat 确定转换数组类型参数结果
                     * brackets key[]
                     * indices key[i]
                     * repeat key
                     */
                    param = qs.stringify(param);
                    break;
                // 带文件form
                case 'multiple':
                    let formData = new FormData();
                    for (let key in param) {
                        formData.append(key, param[key]);
                    }
                    param = formData;
                    break;
            
                default:
                    break;
            }
        } else {
            if (dataType != '[object Array]') param = { ...param };
        }
        Axios.post(url, param).then((res) => {
            if (res.status == 200) {
                resolve(res.response);
            } else {
                reject(res);
            }
        }).catch((mes) => {
            showMessage();
            reject(mes);
        })
    })
}

function showMessage(type='warning', message='服务器繁忙') {
    Message({
        type,
        message
    })
}