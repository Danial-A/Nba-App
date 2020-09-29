import React, { Component } from 'react';
import styles from './videosList.module.css'
import axios from 'axios'
import {URL} from '../../../config'
import Button from '../Buttons/buttons'
import VideosTemplate from './videosListTemplate'

class VideosList extends Component {

    state = {
        teams: [],
        videos: [],
        start:this.props.start,
        end: this.props.start + this.props.amount,
        amount:this.props.amount
        
    }

    componentWillMount (){
        this.request(this.state.start, this.state.end)
    }


    request = (start,end)=>{
        if(this.state.teams.length <1){
            axios.get(`${URL}/teams`).then(response => {
                this.setState({
                    teams: response.data
                })
            })
        }
        axios.get(`${URL}/videos?_start=${start}&_end=${end}`).then(response =>{
            this.setState({
                videos: [...this.state.videos, ...response.data],start,end
            })
        })
    }

    renderVideos = () =>{
        let template = null;

        switch(this.props.type){
            case('card'):
                template = <VideosTemplate data = {this.state.videos} teams = {this.state.teams}/>
                break;
            default:
                template = null;
                break;
        }
        return template;
    }

    loadmore = () =>{
        let end = this.state.end + this.state.amount;
        this.request(this.start.end, end);
    }
    renderButton = ()=>{
        return this.props.loadMore ? 
        <Button type = "loadmore"
        loadmore = {() => this.loadmore()}
        cta = "Load More Videos"/> 
        :
        <Button type = "LinkTo" cta = "More Videos" LinkTo = "/videos"/>;
    }


    RenderTitle = () =>{
        return this.props.title ? <h3><span>NBA</span> Videos</h3> : null
    }
    

    render() {
    
        return (
            <div className = {styles.VideosWrapper}>
                {this.RenderTitle()}
                {this.renderVideos()}
                { this.renderButton() }
            </div>
        );
    }
}

export default VideosList;
