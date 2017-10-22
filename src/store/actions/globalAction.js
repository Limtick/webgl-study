/**
 * @file 发同步actions时调用此方法
 * @author Limtick
 * @date 2017-08-20
*/

const dispatch = ({commit}, {type, payload}) => {
  commit(type, payload);
}
export default dispatch
