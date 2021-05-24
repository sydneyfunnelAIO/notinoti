import React, {createContext, useEffect, useState} from 'react';
import {SERVER_API, TWITTER_API, YOUTUBE_API} from './Config.js';

import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

export const Context = createContext();
const defaultAppMessaging = messaging();
export function MyContext(props) {
  const [onLineChannels, setonLineChannels] = useState([]);
  const [ofLineChannels, setofLineChannels] = useState([]);
  const [Tweets, setTweets] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Input, setInput] = useState('');
  const [Youtube, setYoutube] = useState([])

  const getChannels = () => {
    return new Promise((resolve, reject) => {
      defaultAppMessaging.getToken().then((token) => {
        axios.get(`${SERVER_API}/getUser/${token}`).then((data) => {
          Promise.all(
            data.data.channels.map((channel) => {
              return axios
                .get(`${SERVER_API}/getChannel/${channel}`)
                .then((resp) => {
                  return resp.data;
                });
            }),
          ).then((respon) => {
            let online = respon.filter((cha) => cha.type == 'live');
            let ofline = respon.filter((cha) => cha.type != 'live');
            setonLineChannels(online);
            setofLineChannels(ofline);
            resolve(1);
          });
        });
      });
    });
  };
  const getTwitter = () => {
    return new Promise((resolve, reject) => {
      defaultAppMessaging.getToken().then((token) => {
        axios.get(`${SERVER_API}/getUser/${token}`).then((data) => {
          console.log(data.data);
          Promise.all(
            data.data.Twitter.map((channels) => {
              return axios
                .get(`${TWITTER_API}/getTwitter/${channels}`)
                .then((resp) => {
                  return resp.data;
                });
            }),
          ).then((respon) => {
            let twitters = respon;
            setTweets(twitters);
            resolve(1);
          });
        });
      });
    });
  };
  const getYoutube = ()=>{
    return new Promise((resolve,reject)=>{
      defaultAppMessaging.getToken().then((token)=>{
        axios.get(`${SERVER_API}/getUser/${token}`).then((data)=>{
          console.log(data.data);
          Promise.all(
            data.data.Youtube.map((channels)=>{
              return axios.get(`${YOUTUBE_API}/getYoutube/${channels}`).then((resp)=>{
                return resp.data;
              })
            })
          ).then((respon)=>{
            setYoutube(respon);
            resolve(1);
          })
        })
      })
    })
  }
  const registerTwitter = (twitterName) => {
    let name = twitterName.toLowerCase();
    return new Promise((resolve, reject) => {
      defaultAppMessaging.getToken().then((token) => {
        if (twitterName !== '') {
          axios
            .post(`${TWITTER_API}/setStream`, {
              userId: token,
              twitterName: twitterName,
            })
            .then(() => {
              getTwitter().then(() => {
                setLoading(false);
              });
              resolve(1);
            });
        }
      });
    });
  };
  const registerYoutube = (youtubeName)=>{
    let name = youtubeName.toLowerCase();
    return new Promise((resolve,reject)=>{
      defaultAppMessaging.getToken().then((token)=>{
        if(youtubeName !== "" ){
          axios.post(`${YOUTUBE_API}/registerYoutube`, {
            userId: token,
            channelName: name,
          }).then(()=>{
            getYoutube().then(()=>{
              setLoading(false);
            })
            resolve(1)
          })
        }
      })
    })
  }
  const registerChannel = (channelName) => {
    let name = channelName.toLowerCase();
    return new Promise((resolve, reject) => {
      defaultAppMessaging.getToken().then((token) => {
        if (channelName !== '') {
          axios
            .post(`${SERVER_API}/registerUser`, {
              userId: token,
              channelName: name,
            })
            .then(() => {
              getChannels().then(() => {
                setLoading(false);
              });
              resolve(1);
            });
        }
      });
    });
  };
  const deleteTwitter = (twitterName) => {
    return new Promise((resolve, reject) => {
      defaultAppMessaging.getToken().then((token) => {
        if (twitterName !== '') {
          axios
            .post(`${TWITTER_API}/deleteUser`, {
              userId: token,
              twitterName: twitterName,
            })
            .then(() => {
              getTwitter().then(() => {
                setLoading(false);
              });
              resolve(1);
            });
        }
      });
    });
  };
  const deleteYoutube = (youtubeName)=>{
    return new Promise((resolve,reject)=>{
      defaultAppMessaging.getToken().then((token)=>{
        if(youtubeName !== ""){
          axios.post(`${YOUTUBE_API}/deleteUser`, {
            userId:token,
            youtubeId:youtubeName,
          }).then(()=>{
            getYoutube().then(()=>{
              setLoading(false);
            })
            resolve(1);
          })
        }
      })
    })
  }
  const deleteChannel = (channelName) => {
    return new Promise((resolve, reject) => {
      defaultAppMessaging.getToken().then((token) => {
        if (channelName !== '') {
          axios
            .post(`${SERVER_API}/deleteUser`, {
              userId: token,
              channelName: channelName,
            })
            .then(() => {
              getChannels().then(() => {
                setLoading(false);
              });
              resolve(1);
            });
        }
      });
    });
  };
  return (
    <Context.Provider
      value={{
        onLineChannels,
        ofLineChannels,
        Input,
        Loading,
        setLoading,
        setInput,
        deleteChannel,
        registerChannel,
        setonLineChannels,
        getChannels,
        setofLineChannels,
        registerTwitter,
        getTwitter,
        Tweets,
        deleteTwitter,
        deleteYoutube,
        getYoutube,
        registerYoutube,
        Youtube
      }}>
      {props.children}
    </Context.Provider>
  );
}
