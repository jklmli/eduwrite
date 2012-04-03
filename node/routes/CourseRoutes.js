/** Routes for lecture related operations 
  Following RESTful routing **/
module.exports = new function() {
  var _this = this;

  /**
    List all courses
    **/
  this.index = function(req,res){
    res.render('lectures/index', {
        title: 'Help'
    });
  };

  /**
    Create a course
    This should be only done by users with
    role as a professor
    **/
  this.create = function(req,res){
    //if req = GET

    //if req = POST
  }

  /**
    Show a course
    **/
  this.show = function(req,res){

  }

  /**
    Edit/update a course
    **/
  this.update = function(req,res){
    //if req = GET

    //if req = POSt
    res.redirect('/lectures/'+id');
  }

  /**
    Remove a course
    **/
  this.destroy = function(req,res){
    

    //remove all dependent lectures
    res.redirect('/lectures/');
  }



  this.accountManagementHelp = function(request, response) {
    // Show index if logged in, redirect otherwise
    if (request && request.session.user) {

      // Render the accountManagement page template
      
    } else {
    }
  };

  return this;
};
