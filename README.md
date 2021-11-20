# rest_api
# A simple REST API made by Ishola Obafemi
API is able to POST ,PUT,DELETE AND PUT request to update,create,get and delete data.
<br/>
Format/Structure:
<br/>
{
        "id":1,
        "name":"John",
        "description": "Student of Class A",
        "status": "School fees hasnt been Paid"
}
<br/>
<br/>
GET https://obscure-hamlet-99215.herokuapp.com/api/v1/student/:id – This will get the data of student of given id e.g https://obscure-hamlet-99215.herokuapp.com/api/v1/student/2
<br/>
<br/>
POST https://obscure-hamlet-99215.herokuapp.com/api/v1/student – This will create new data for a student , uses req.body.id , req.body.name . req.body.description , req.body.status
<br/>
<br/>
PUT https://obscure-hamlet-99215.herokuapp.com/api/v1/student/:id – This will update the data of a student,  uses req.body.id , req.body.name . req.body.description , req.body.status
<br/>
<br/>
DELETE https://obscure-hamlet-99215.herokuapp.com/api/v1/student/:id  – This will delete the data of a student
