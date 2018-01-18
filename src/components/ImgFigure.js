import React,{Component} from 'react';
class ImgFigure extends Component{
    /**
     *
     */
    handleClick(e){
        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    }
    render(){
        let styleObj={

        };
        //如果props属性中指定了这张图片的位置 则用
        if(this.props.arrange.pos) {
            // styleObj = this.props.arrange.pos;
            // styleObj.left = this.props.arrange.pos.left;
            // styleObj.top = this.props.arrange.pos.top;
            styleObj=Object.assign(styleObj,this.props.arrange.pos);
        }

        if(this.props.arrange.rotate){
            ['-moz-','-ms-','-webkit-',''].forEach((value)=>{
                styleObj['transform']=`rotate(${this.props.arrange.rotate}deg)`;
            });
        }
        // 如果是居中的图片， z-index设为11
        if(this.props.arrange.isCenter){
            styleObj.zIndex=11;
        }
        let imgFigureClassName="img-figure";
        imgFigureClassName+=this.props.arrange.isInverse?' is-inverse' :'';
        return (
            <figure className={imgFigureClassName} style={styleObj}  onClick={this.handleClick.bind(this)}>
                <img src={this.props.data.imageUrl} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick.bind(this)}>
                        <p>{this.props.data.desc}</p>
                    </div>
                </figcaption>
            </figure>
        );
    }
}
export default ImgFigure;