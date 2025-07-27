function generateImageUrl({filename,format,option='q_auto,c_fill'}:{
    filename:string
    format:'jpeg'|'webp'
    option?:string
}){
    return `https://res.cloudinary.com/dtzps6hve/image/upload/${option}/v1753578583/${format}/${filename}.${format}`
}

export default generateImageUrl