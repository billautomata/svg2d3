var d3 = require('d3')

window.svg_text = '<svg width="1003" height="908" \
  style="background-color: white;"><defs><linearGradient id="gradient0"><stop \
  offset="94%" stop-color="green" stop-opacity="1"></stop><stop offset="100%" \
  stop-color="yellow" stop-opacity="1"></stop></linearGradient></defs><g \
  transform="translate(501.5 454)"><circle cx="0" cy="0" r="401" \
  fill="url(#gradient0)"></circle></g></svg>'

// window.svg_text = '<svg>' +
// '<g foo="bar"></g>' +
// '<g foo="bar"></g>' +
// '<g foo="bar"></g>' +
// '<g foo="bar"></g>' +
// '<q foo="bar"></q>' +
// '<q foo="bar"></q>' +
// '<q foo="bar"></q>' +
// '<q foo="bar"></q>' +
// '<g foo="bar"></g>' +
// '</svg>'

window.onload = function(){

  d3.select('body').append('div').html('hello world ' + Date.now())

  window.oParser = new DOMParser()
  window.oDom = window.oParser.parseFromString(window.svg_text, 'text/xml')


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

  flat_list.forEach(function(e){console.log(e)})

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



    // d.children.forEach(function(element){
    //   console.
    //   recurse(element[0])
    // })


  }

  return;

}
