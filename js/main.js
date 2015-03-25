var d3 = require('d3')
var xmltojson = require('xmltojson')

window.svg_text = '<svg width="1003" height="908" \
  style="background-color: white;"><defs><linearGradient id="gradient0"><stop \
  offset="94%" stop-color="green" stop-opacity="1"></stop><stop offset="100%" \
  stop-color="yellow" stop-opacity="1"></stop></linearGradient></defs><g \
  transform="translate(501.5 454)"><circle cx="0" cy="0" r="401" \
  fill="url(#gradient0)"></circle></g></svg>'

window.svg_text = '<svg>' +
'<g foo="bar"></g>' +
'<g foo="bar"></g>' +
'<g foo="bar"></g>' +
'<g foo="bar"></g>' +
'<q foo="bar"></q>' +
'<q foo="bar"></q>' +
'<q foo="bar"></q>' +
'<q foo="bar"></q>' +
'<g foo="bar"></g>' +

'</svg>'

window.onload = function(){

  d3.select('body').append('div').html('hello world ' + Date.now())

  window.oParser = new DOMParser()
  window.oDom = window.oParser.parseFromString(window.svg_text, 'text/xml')

  // console.log(obj)

  console.log(((xmltojson.parseXML(window.oDom))))

  return;

  // crawl array and dump the contents formmated
  var root = xmltojson.parseXML(window.oDom)
  recurse(root)

function recurse(root){

  // console.log(Object.keys(root))

  Object.keys(root).forEach(function(element_name){

    var tag = element_name
    var element = root[tag]
    if(element === null){return;}

    // console.log('key: ' + element_name)
    // console.log('element: ' + element)

    // console.log('How many children: '+ element.length)

    if(element.length > 0){

      recurse(element)

    } else {

      // console.log('no children')
      // console.log(Object.keys(element))

      Object.keys(element).forEach(function(key_name){


        if(element[key_name].length > 0){
          // console.log('hhhh')
          element.__tag = key_name
          recurse(element[key_name])
        } else {
          console.log(element)
          console.log(key_name)
          // console.log(element[key_name].length)
        }


      })

      // // does this tag have any attributes?
      // var attributes_present = (element._attr === undefined)
      //
      // if(attributes_present){
      //   console.log(Object.keys(element._attr))
      // }
    }




    //recurse(root[element_name])


  })
}

}
