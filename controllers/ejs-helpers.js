function renderTag (budgetTags){
    let buildTag = ''  
    for (let i = 0; i < budgetTags.length; i += 1) {
     if (i === 0) {
         buildTag = budgetTags[i];
     } else {
           buildTag = buildTag + ", " + budgetTags[i];
           }
    }
    console.log("buildTag", buildTag)

   
    return  `<td class="first=child">${buildTag}</td>`
}

module.exports= {
    renderTag
}