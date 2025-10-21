export const LifelinesEnum = {
    fiftyFifty: "fiftyFifty",
    audience: "audience",
    phone: "phone",
} as const;

export const sounds = {
    click:{
        path:"/sounds/click.mp3",
        loop:false
    },
    bg:{
        path:"/sounds/bg-sound.mp3",
        loop:true
    },
    correct:{
        path:"/sounds/correct.mp3",
        loop:false
    },
    wrong:{
        path:"/sounds/wrong.mp3",
        loop:false
    },
} as const;