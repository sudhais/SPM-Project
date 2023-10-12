class ApiFeatures{
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(){
    let keyword = this.queryStr.keyword ?{
      userID:{
        $regex: this.queryStr.keyword,
        $options: 'i'
      }    
    }:{};

    let keyword1 = this.queryStr.keyword1 ?{
      "reports.class":{
        $regex: this.queryStr.keyword1,
        $options: 'i'
      }    
    }:{};

    // let keyword1 = this.queryStr.keyword1 ?{
    //   "reports.class": `${this.queryStr.keyword1}`   
    // }:{};

    this.query.find({...keyword,...keyword1});
    return this;
  } 
}



module.exports = ApiFeatures;