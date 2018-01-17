import React,{Component} from 'react';
class ImgFigure extends Component{
    render(){
        let styleObj={

        };
        //如果props属性中指定了这张图片的位置 则用
        if(this.props.arrange.pos){
            styleObj=this.props.arrange.pos;
        }
        if(this.props.arrange.rotate){
            ['-moz-','-ms-','-webkit-',''].forEach((value)=>{
                styleObj[value+'transform']='rotate('+this.props.arrange.rotate+'deg)';
            });

        }
        return (
            <figure className="img-figure" style={styleObj}>
                <img src={this.props.data.imageUrl} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        );
    }
}
export default ImgFigure;