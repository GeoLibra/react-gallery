import React,{Component} from 'react';

class ControllerUnit extends Component{
    handleClick(e){
        //如果点击的居选中按钮则翻转图片  否则居中图片
        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else {

            this.props.center();
        }
        e.preventDefault();
        e.stopPropagation();
    }
    render(){
        let controllerUnitClassName="controller-unit";
        //如果对应的是居中的图片 显示控制按钮的居中太

        if(this.props.arrange.isCenter){
            controllerUnitClassName+=" is-center";

            //如果同时对应的是翻转图片 显示控制按钮的翻转状态
            if(this.props.arrange.isInverse){
                controllerUnitClassName+=' is-inverse';
            }
        }
       return (
           <span className={controllerUnitClassName} onClick={this.handleClick.bind(this)}></span>
       );
    }
}

export default ControllerUnit;