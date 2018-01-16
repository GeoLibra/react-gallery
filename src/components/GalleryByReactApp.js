import React,{Component} from 'react';
import '../styles/main.scss';
import imageDatas from '../data/imageDatas.json';
import ImgFigure from './ImgFigure';
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
class GalleryByReactApp extends Component{
    render(){
        let controllerUnits=[],
            imgFigures=[];
        imageDatas.forEach((value)=>{
            imgFigures.push(<ImgFigure data={value}/>);

        });
        return (
            <section className="stage">
                <section className="img-sec">{imgFigures}</section>
                <nav className="controller-nav">{controllerUnits}</nav>
            </section>
        );
    }
}
export default GalleryByReactApp;