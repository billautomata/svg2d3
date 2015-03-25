var d3 = require('d3')

window.onload = function(){
  d3.select('#clicker').on('click',function(){
    var svgtxt = d3.select('textarea').node().value
    console.log(svgtxt)
    created3(svgtxt)
  })
}

function created3(svg_text){

  window.oParser = new DOMParser()
  window.oDom = window.oParser.parseFromString(svg_text, 'text/xml')

  var flat_list = []
  recurse(window.oDom, 0)

  console.log(JSON.stringify(flat_list,null,2))

  flat_list.forEach(function(element,idx,arry){
    if(element.level > 0){

      // move from the current index to zero
      // until you find an element whose level is 1 less than yours

      console.log(element)
      console.log(idx)

      for(var crawl_idx = idx; crawl_idx >= 0; crawl_idx--){
        if(arry[crawl_idx].level < element.level){
          element.parent_idx = crawl_idx
          element.parent_tag = arry[crawl_idx].tagName
          crawl_idx = -1
        }
      }
    }
  })

  var codelines = []

  flat_list.forEach(function(e,idx){

    // generate d3 code
    // identifier var name is the tagname+idx
    var identifier = e.tagName+'_'+idx
    var parent_identifier

    if(e.level > 0){
      parent_identifier = e.parent_tag + '_' + e.parent_idx
    } else {
      parent_identifier = 'container'
    }

    codelines.push(';var ' + identifier + ' = ' + parent_identifier +'.append(\''+e.tagName+'\')')

    e.attrs.forEach(function(attr){
      codelines.push('.attr(\'' + attr.name + '\',\'' + attr.value + '\')')
    })

  })

  // codelines.forEach(function(e){console.log(e)})

  var container = d3.select('body').append('div')
  eval(codelines.join('\n'))

  d3.select('body').append('div').attr('class','d3code').append('textarea').attr('rows',codelines.length+4).text(codelines.join('\n'))

  function recurse(d, level){

    // console.log(typeof d)
    // console.log(d.length)
    // console.log(Object.keys(d))
    // console.log(d)
    // console.log(d.children.length)

    for(var i = 0; i < d.children.length; i++){
      // console.log(d.children[i])
      // console.log(d.children[i].attributes)

      console.log(level, d.children[i].tagName)

      var this_child = {
        level: level,
        tagName: d.children[i].tagName,
        attrs: []
      }

      for(var j = 0; j < d.children[i].attributes.length; j++){
        var attr = d.children[i].attributes[j]
        console.log('attr=',attr.nodeName,attr.nodeValue)
        this_child.attrs.push({name: attr.nodeName, value: attr.nodeValue})
      }

      flat_list.push(this_child)

      recurse(d.children[i], level+1)
    }

  }

  return;

}
