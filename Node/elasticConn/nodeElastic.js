var express = require('express');
var router = express.Router();
var elastic = require('../connection')


/* GET home page. */
router.get('/', function(req, res, next) {

  //검색어, 검색영역, 병원(신촌세브, 강남세브)
  const keyword = req.query.keyword; //검색어
  let scope = req.query.scope; // 제목, 본문
  let category = req.query.category; //신촌, 강남세브란스

  let result;

  //console
  console.log('keyword : ',keyword,'scope : ',scope,'category : ',category);
  console.log(req.query);
  console.log(req.body);

  //array 
  //바꾸고 
  //fields 대입

  if(category === "gs"){
    category = "gs";
  } else if(category === "sev"){
    category = "sev";
  }

  let body = {
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query: keyword,
              fields: scope

            }
          }
        ],
        filter: [
          {
            term: {
            m_site_cd: category
            }
          }
        ]
      }
    },
    aggs: {
      sevgs: {
        terms: {
          field: "m_site_cd"
        }
      }
    },
    size: 20,
    _source: []
  }

  console.log(JSON.stringify(body))

  elastic.search({
    index: 'board',
    body: body
  })
  .then(resp => {
    const result = {
      totalSize: resp.body.hits.total.value,

      list: resp.body.hits.hits.map(data => {
        return data._source
      })
    }
    // resp.body.hits.hits.map(data => {
    //   result.list.push(data._source)
    // })

    // .then(resp => {
    //   return resp.body.hits
    // })
    // .then(resp => {
    //   const result ={
    //     totalsize:resp.total.value,
    //     list:resp.hits.map(data =>{
    //       return data._source
    //     })
    //   }
    // })
    

    console.log(resp)

    res.json(result);
  })
});


module.exports = router;
