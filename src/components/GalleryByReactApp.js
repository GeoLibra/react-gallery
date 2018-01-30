import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../styles/main.css';
import imageDatas from '../data/imageDatas.json';
import ImgFigure from './ImgFigure';
import ControllerUnit from './ControllerUnit';
// let genImageUrl=(imageDatasArr)=>{
//     for (let i=0;i<imageDatasArr.length;i++){
//         let singleImageData=imageDatasArr[i];
//         singleImageData.imageUrl=require('../images'+singleImageData.filename);
//         imageDatasArr[i]=singleImageData;
//     }
//     return imageDatasArr;
// }
// // let imageDatas=genImageUrl(imageDatas);

//获取图片相关的数组
let imageData=((imageDatasArr)=>{
    for (let i=0;i<imageDatasArr.length;i++){
        let singleImageData=imageDatasArr[i];
        singleImageData.imageUrl=require('../images/'+singleImageData.fileName);
        imageDatasArr[i]=singleImageData;
    }
    return imageDatasArr;
})(imageDatas);

let getRangeRandom=(low,high)=>{
    return Math.ceil(Math.random()*(high-low)+low);
}
/**
 * 获取0-30°之间任意一个正负值
 */
let get30DegRandom=()=>{
    let deg=Math.random();
    return (deg>0.5?'':'-')+Math.ceil(deg*30);

}
/**
 * scrollWidth 对象的实际内容的宽度 不包含滚动条等边线宽度 会随对象中内容超过可视区域后而变大
 * clientWidth 对象内容的可视区域宽度 不包含滚动条等边线宽度 会随对象显示大小的变化而改变
 * offsetWidth 对象整体的实际宽度 包滚动条等边线 会随对象显示大小的变化而改变
 */

class GalleryByReactApp extends Component{
    constructor(props){
        super(props);
        this.state={
            imgsArrangeArr:[
                // {
                //     pos:{
                //         left:'0',
                //         top:'0'
                //     },
                //     rotate:0, //旋转角度
                //     isInverse:false
                // }
            ]
        }
        this.Constant= {
            centerPos: {
                left: 0,
                right: 0
            },
            hPosRange: {
                leftSecX: [0, 0],
                rightSecX: [0, 0],
                y: [0, 0]
            },
            vPosRange: {    // 垂直方向的取值范围
                x: [0, 0],
                topY: [0, 0]
            }
        }
    }


    /**
     * 重新布局所有图片
     * @param centerIndex  指定居中排布哪个图片
     */
    rearrange(centerIndex){
        let imgArrangeArr=this.state.imgsArrangeArr,
            Constant=this.Constant,
            centerPos=Constant.centerPos,
            hPosRange=Constant.hPosRange,
            vPosRange=Constant.vPosRange,
            hPosRangeLeftSecX=hPosRange.leftSecX,
            hPosRangeRightSecX=hPosRange.rightSecX,
            hPosRangeY=hPosRange.y,
            vPosRangeTopY=vPosRange.topY,
            vPosRangeX=vPosRange.x,

            imgsArrangeTopArr=[],
            //取一个或不取
            // topImgNum=Math.ceil(Math.random()*2),
            topImgNum=Math.floor(Math.random()*2),
            topImgSpliceIndex=0,
            //中心图片的状态信息
            imgsArrangeCenterArr=imgArrangeArr.splice(centerIndex,1);
        //s首先居中centerIndex的图片
        imgsArrangeCenterArr[0]={
            pos:centerPos,
            rotate:0,
            isCenter:true
        };

        //取出要布局上侧的图片状态信息
        topImgSpliceIndex=Math.ceil(Math.random()*(imgArrangeArr.length-topImgNum));
        imgsArrangeTopArr=imgArrangeArr.splice(topImgSpliceIndex,topImgNum);

        //布局位于上侧的图片
        imgsArrangeTopArr.forEach((value,index)=>{
            imgsArrangeTopArr[index]={
                pos:{
                    top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
                    left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
                },
                rotate:get30DegRandom(),
                isCenter: false
            }
        });
        //布局两侧的图片
        for(let i=0,j = imgArrangeArr.length, k = j / 2;i<j;i++){
            let hPosRangeLORX=null;
            //前半部分布局左边
            if(i<k){
                hPosRangeLORX=hPosRangeLeftSecX;
            }else {
                hPosRangeLORX=hPosRangeRightSecX;
            }
            imgArrangeArr[i]={
                pos:{
                    top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
                    left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
                },
                rotate:get30DegRandom(),
                isCenter:false
            }
        }
        // debugger;
        if(imgsArrangeTopArr&&imgsArrangeTopArr[0]){
            imgArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }
        imgArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
        this.setState({
            imgsArrangeArr:imgArrangeArr
        });
    }
    center(index){
        return ()=>{
            this.rearrange(index);
        }
    }
    //组件加载以后  为每张图片计算其位置范围
    componentDidMount(){
        //舞台大小
        let stageDOM=ReactDOM.findDOMNode(this.refs.stage),
            stageW=stageDOM.scrollWidth,
            stageH=stageDOM.scrollHeight,
            halfStageW=Math.ceil(stageW/2),
            halfStageH=Math.ceil(stageH/2);
        //拿到一个imageFigure大小
        let imgFigureDOM=ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW=imgFigureDOM.scrollWidth,
            imgH=imgFigureDOM.scrollHeight,
            halfImgW=Math.ceil(imgW/2),
            halfImgH=Math.ceil(imgH/2);
        //计算中心图片的位置点
        this.Constant.centerPos={
            left:halfStageW-halfImgW,
            top:halfStageH-halfImgH
        }
        //计算左侧右侧区域图片排布位置的取值范围
        this.Constant.hPosRange.leftSecX[0]=-halfImgW;
        this.Constant.hPosRange.leftSecX[1]=halfStageW-halfImgW*3;

        this.Constant.hPosRange.rightSecX[0]=halfStageW+halfImgW;
        this.Constant.hPosRange.rightSecX[1]=stageW-halfImgW;
        this.Constant.hPosRange.y[0]=-halfImgH;
        this.Constant.hPosRange.y[1]=stageH-halfImgH;

        //计算上侧区域图片的位置取值范围
        this.Constant.vPosRange.topY[0]=-halfImgH;
        this.Constant.vPosRange.topY[1]=halfStageH-halfImgH*3;
        this.Constant.vPosRange.x[0]=halfStageW-imgW;
        this.Constant.vPosRange.x[1]=halfStageW;

        this.rearrange(0);
    }

    /**
     * 翻转图片
     * @param index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
     * @return {Function} 这是一个闭包函数  其内return一个真正待被执行的函数
     */
    inverse(index){
        return ()=>{
            let imgsArrangeArr=this.state.imgsArrangeArr;
            // let imgsArrangeArr=Object.assign({},this.state.imgsArrangeArr);
            imgsArrangeArr[index].isInverse=!imgsArrangeArr[index].isInverse;
            this.setState({
                imgsArrangeArr:imgsArrangeArr
            });
        };
    }

    render(){
        let controllerUnits=[],
            imgFigures=[];
        imageData.forEach((value,index)=>{
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index]={
                    pos:{
                        left:0,
                        top:0
                    },
                    rotate:0,
                    isInverse: false,
                    isCenter: false
                };
            }
            imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure'+index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index).bind(this)} center={this.center(index).bind(this)}/>);
            controllerUnits.push(<ControllerUnit arrange={this.state.imgsArrangeArr[index]} key={index} inverse={this.inverse(index).bind(this)} center={this.center(index).bind(this)}/>);
        });

        return (
            <section className="stage" ref="stage">
                <section className="img-sec">{imgFigures}</section>
                <nav className="controller-nav">{controllerUnits}</nav>
            </section>
        );
    }
}
export default GalleryByReactApp;