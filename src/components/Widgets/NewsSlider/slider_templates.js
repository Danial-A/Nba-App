import React from 'react';
import Slick from 'react-slick'
import style from './newsSlider.module.css'
import {Link} from 'react-router-dom'

const SliderTemplates = (props) => {

    let template = null;

    const settings = {
        dots:true,
        infinite:true,
        arrows:false,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1,
        ...props.settings
    }

    switch(props.type){
        case('featured'):
            template = props.data.map((item,i) =>{
                return(
                    <div key = {i}>
                        <div className = {style.featuredItem}>
                            <div className = {style.featuredImage} style = {{
                                background:`url(../images/articles/${item.image})`
                            }}></div>
                        <Link to ={`/articles/${item.id}`}>
                            <div className = {style.featuredCaption}>
                                {item.title}
                            </div>
                        </Link>
                            
                        </div>
                    </div>
                )
            })
            break;
        default:
            template = null;
    }

    return (
        <Slick {...settings}>
            {template}
        </Slick>
    );
};

export default SliderTemplates;