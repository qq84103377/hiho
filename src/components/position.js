export const getPosition =  (position) => {
    let position1  = position && position.getPosition() && position.getPosition().top
  return position1
}
export const getPositionEnter =  (position, vm, positionName) => {
    if(vm && positionName ){//通过vm实例访问this
        setTimeout(function () {
          positionName.scrollTo(0, position, false);
        },0)//同步转异步操作
    }
}