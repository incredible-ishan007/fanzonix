var express = require("express");
var fileuploader = require("express-fileupload");
var cloudinary = require("cloudinary").v2;
var mysql2 = require("mysql2");
var app = express();

app.use(fileuploader());
app.use(express.static("public"));


app.listen(2004, function () {
    console.log("Server Started at Port no: 2004")
})

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBbzYoESmtKpK_XllC4NZNL2NGx2aAlfcg");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });




app.get("/", function (req, resp) {
    console.log(__dirname);
    console.log(__filename);

    let path = __dirname + "/public/index.html";
    resp.sendFile(path);
})

let dbConfig = "mysql://avnadmin:AVNS_-loD7DazSWgVI0cOXoF@mysql-28a730ce-gargishan-a0f1.e.aivencloud.com:22035/defaultdb";
let mySqlVen = mysql2.createPool(dbConfig);
console.log("AiVen Connected Successfulllyyy!!!!")
// mySqlVen.connect(function (errKuch) {
//     if (errKuch == null)
//         console.log("AiVen Connected Successfulllyyy!!!!");
//     else
//         console.log(errKuch.message)
// })






app.get("/signup", function (req, resp) {
    let email = req.query.txtEmail;

    let pass = req.query.txtPwd;
    let rol = req.query.comboUser;

    mySqlVen.query("insert into sports_signup values(?,?,?,1,current_date())", [email, pass, rol], function (errKuch) {
        if (errKuch == null)
            resp.send("Record Saved Successfulllyyy....Badhai");
        else
            resp.send(errKuch.message)

    })
})




app.get("/login", function (req, resp) {
    let email = req.query.txtEmail;
    let pass = req.query.txtPwd;

    mySqlVen.query("select * from sports_signup where email=? and pass=?", [email, pass], function (errKuch, allRecords) {

        if (errKuch == null) {
            if (allRecords.length == 0)
                resp.send("no record");
            else
                resp.json(allRecords);

        }
        else
            resp.send(errKuch.message)

    })
})


app.get("/org-dash", function (req, resp) {


    let path = __dirname + "/public/org-dash.html";
    resp.sendFile(path);
})

app.get("/org-detail", function (req, resp) {


    let path = __dirname + "/public/org-detail.html";
    resp.sendFile(path);
})



cloudinary.config({
    cloud_name: 'dtypk3txb',
    api_key: '644114489717736',
    api_secret: 'tgBWa444xMdGk9LI5zH8ZGarXaQ'
});

app.post("/SendServer", async function (req, resp) {
    let email3 = req.body.txtEmail3;
    let org_name3 = req.body.txtName3;
    let registeration_num3 = req.body.txtRNum3;
    let address3 = req.body.txtAdd3;
    let city3 = req.body.txtCity3;
    let sports3 = req.body.txtSports3;
    let website3 = req.body.txtWeb3;
    let insta3 = req.body.txtInsta3;
    let head3 = req.body.txtHead3;
    let contact3 = req.body.txtCNum3;
    let other_info3 = req.body.txtInfo3;

    let picurl3 = "";
    if (req.files != null) {
        let fName = req.files.profilePic.name;
        let fullPath = __dirname + "/public/uploads/" + fName;
        req.files.profilePic.mv(fullPath);

        await cloudinary.uploader.upload(fullPath).then(function (picUrlResult) {
            picurl3 = picUrlResult.url;


        });
    }
    else
        picurl3 = "nopic.jpg";





    mySqlVen.query("insert into org_detail values(?,?,?,?,?,?,?,?,?,?,?,?)", [email3, org_name3, registeration_num3, address3, city3, sports3, website3, insta3, head3, contact3, picurl3, other_info3], function (errKuch) {
        if (errKuch == null)
            resp.send("Record Saved Successfulllyyy....Badhai");
        else
            resp.send(errKuch.message)

    })
})

app.get("/search", function (req, resp) {
    mySqlVen.query("select * from org_detail where email3=?", [req.query.txtEmail3], function (err, allRecords) {
        if (err == null) {
            if (allRecords.length == 0)
                resp.send("No Record Found");
            else
                resp.json(allRecords);
        }
        else {
            resp.send(err);
        }
    })
})



app.get("/searchPlayer", function (req, resp) {
    mySqlVen.query("select * from player_detail where email5=?", [req.query.txtEmail5], function (err, allRecords) {
        if (err == null) {
            if (allRecords.length == 0)
                resp.send("No Record Found");
            else
                resp.json(allRecords);
        }
        else {
            resp.send(err);
        }
    })
})


app.get("/jadu", function (req, resp) {
    mySqlVen.query("select * from org_detail where email3=?", [req.query.txtEmail4], function (err, allRecords) {
        if (err == null) {
            if (allRecords.length == 0)
                resp.send(1);
            else
                resp.send(2);
        }
        else {
            resp.send(err);
        }
    })
})








app.post("/modify", async function (req, resp) {
    let email3 = req.body.txtEmail3;
    let org_name3 = req.body.txtName3;
    let registeration_num3 = req.body.txtRNum3;
    let address3 = req.body.txtAdd3;
    let city3 = req.body.txtCity3;
    let sports3 = req.body.txtSports3;
    let website3 = req.body.txtWeb3;
    let insta3 = req.body.txtInsta3;
    let head3 = req.body.txtHead3;
    let contact3 = req.body.txtCNum3;
    let other_info3 = req.body.txtInfo3;

    let picurl3 = "";
    if (req.files != null) {
        let fName = req.files.profilePic.name;
        let fullPath = __dirname + "/public/uploads/" + fName;
        req.files.profilePic.mv(fullPath);

        await cloudinary.uploader.upload(fullPath).then(function (picUrlResult) {
            picurl3 = picUrlResult.url;



            mySqlVen.query("update org_detail set org_name3=?,registeration_num3=?,address3=?,city3=?,sports3=?,website3=?,insta3=?,head3=?,contact3=?,picurl3=?,other_info3=? where email3=?", [org_name3, registeration_num3, address3, city3, sports3, website3, insta3, head3, contact3, picurl3, other_info3, email3], function (errKuch) {
                if (errKuch == null)
                    resp.send("Record Modified Successfulllyyy....Badhai");
                else
                    resp.send(errKuch.message)

            })



        });
    }
    else {






        mySqlVen.query("update org_detail set org_name3=?,registeration_num3=?,address3=?,city3=?,sports3=?,website3=?,insta3=?,head3=?,contact3=?,other_info3=? where email3=?", [org_name3, registeration_num3, address3, city3, sports3, website3, insta3, head3, contact3, other_info3, email3,], function (errKuch) {
            if (errKuch == null)
                resp.send("Record Modified Successfulllyyy....Badhai");
            else
                resp.send(errKuch.message)

        })
    }
})

//--------------------------------------------------------------------------------------------
app.get("/post-tournaments", function (req, resp) {


    let path = __dirname + "/public/post-tournaments.html";
    resp.sendFile(path);
})



app.get("/event-info", function (req, resp) {
    let emailid = req.query.txtEmail4;
    let title = req.query.txtTitle4;
    let doe = req.query.txtDate4;
    let toe = req.query.txtTime4;
    let address = req.query.txtAdd4;
    let city = req.query.txtCity4;
    let sports = req.query.txtSports4;
    let minage = req.query.txtMinAge4;
    let maxage = req.query.txtMaxAge4;
    let prize = req.query.txtPrize4;
    let contactname = req.query.txtCName4;
    let contactnum = req.query.txtCNum4;
    let ldr = req.query.txtLDR4;
    let fee = req.query.txtFee4;



    mySqlVen.query("insert into post_event values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [null, emailid, title, doe, toe, address, city, sports, minage, maxage, prize, contactname, contactnum, ldr, fee], function (errKuch) {
        if (errKuch == null)
            resp.send("Record Saved Successfulllyyy....Badhai");
        else
            resp.send(errKuch.message)

    })
})

app.get("/player-dash", function (req, resp) {


    let path = __dirname + "/public/player-dash.html";
    resp.sendFile(path);
})

app.get("/tournament-detail", function (req, resp) {


    let path = __dirname + "/public/tournament-detail.html";
    resp.sendFile(path);
})




app.get("/do-fetch-all-users", function (req, resp) {
    let emailid = req.query.txtEmail5;
    mySqlVen.query("select * from post_event where emailid=?", [emailid], function (err, allRecords) {
        resp.send(allRecords);
    })
})


app.get("/delete-one", function (req, resp) {
    console.log(req.query)
    let rid = req.query.ridKuch;;;;;
    // let pwd = req.query.pwdKuch;

    mySqlVen.query("delete from post_event where rid=?", [rid], function (errKuch, result) {
        if (errKuch == null) {
            if (result.affectedRows == 1)
                resp.send( " Deleted Successfulllyyyy...");
            else
                resp.send("Invalid Rid");
        }
        else
            resp.send(errKuch);

    })
})

app.get("/block", function (req, resp) {
    console.log(req.query)
    let email = req.query.emailKuch;

    mySqlVen.query("update sports_signup set status=?  where status=? and email=?", [0,1,email], function (errKuch, result) {
        if (errKuch == null) {
            
                resp.send( " blockeddddddd");
           
        }
        else
            resp.send(errKuch);

    })
})

app.get("/unblock", function (req, resp) {
    console.log(req.query)
    let email = req.query.emailKuch;

    mySqlVen.query("update sports_signup set status=?  where status=? and email=?", [1,0,email], function (errKuch, result) {
        if (errKuch == null) {
            
                resp.send( " unblockeddddddd");
           
        }
        else
            resp.send(errKuch);

    })
})











//-------------------------------------------------------------------------------
app.get("/all-tournaments", function (req, resp) {


    let path = __dirname + "/public/all-tournaments.html";
    resp.sendFile(path);
})

app.get("/player-detail", function (req, resp) {


    let path = __dirname + "/public/player-detail.html";
    resp.sendFile(path);
})


app.get("/do-fetch-all-tournaments", function (req, resp) {

    mySqlVen.query("select * from post_event where city=? and sports=?", [req.query.kuchCity, req.query.kuchGame], function (err, allRecords) {
        if (err == null)
            resp.send(allRecords);
        else
            resp.send(err);
    })
})


app.get("/do-fetch-organizer", function (req, resp) {

    mySqlVen.query("select * from org_detail ", function (err, allRecords) {
        resp.send(allRecords);
    })
})

app.get("/do-fetch-player", function (req, resp) {

    mySqlVen.query("select * from player_detail ", function (err, allRecords) {
        resp.send(allRecords);
    })
})



app.get("/do-fetch-all", function (req, resp) {

    mySqlVen.query("select * from sports_signup ", function (err, allRecords) {
        resp.send(allRecords);
    })
})


app.get("/do-fetch-all-cities", function (req, resp) {

    mySqlVen.query("select distinct city from post_event ", function (err, allRecords) {
        resp.send(allRecords);
    })
})




//---------------------------------------------------------------------

app.get("/admin-dash", function (req, resp) {
    let path = __dirname + "/public/admin-dash.html";
    resp.sendFile(path);
})

app.get("/view-organizers", function (req, resp) {
    let path = __dirname + "/public/view-organizers.html";
    resp.sendFile(path);
})

app.get("/view-players", function (req, resp) {
    let path = __dirname + "/public/view-players.html";
    resp.sendFile(path);
})

app.get("/all-users", function (req, resp) {
    let path = __dirname + "/public/all-users.html";
    resp.sendFile(path);
})






//----------------------------------------------------------------


app.post("/player-detail", async function (req, resp) {


    let player_pic5= "";
    if (req.files != null) {
        let fName = req.files.profilePic3.name;
        let fullPath = __dirname + "/public/uploads/" + fName;
        req.files.profilePic3.mv(fullPath);

        await cloudinary.uploader.upload(fullPath).then(function (picUrlResult) {
            player_pic5 = picUrlResult.url;


        });
    }



    let aadhar5 = "";
    if (req.files != null) {
        let fName = req.files.profilePic2.name;
        let fullPath = __dirname + "/public/uploads/" + fName;
        req.files.profilePic2.mv(fullPath);

        try {
            await cloudinary.uploader.upload(fullPath).then(async function (picUrlResult) {

                let jsonData = await RajeshBansalKaChirag(picUrlResult.url);
                console.log(jsonData);
              
                aadhar5 = picUrlResult.url;
                let name5 = jsonData.name;
                let dob5 = jsonData.dob;
                let gender5 = jsonData.gender;
                let aadhar_num5 = jsonData.adhaar_number;
                let email5 = req.body.txtEmail5;

                let address5 = req.body.txtAddress5;
                let contact5 = req.body.txtContact5;

                let sports5 = req.body.txtSports5;
                let other_info5 = req.body.txtInfo5;
                mySqlVen.query("insert into player_detail values(?,?,?,?,?,?,?,?,?,?,?)", [email5, aadhar5, player_pic5, aadhar_num5, name5, dob5, gender5, address5, contact5, sports5, other_info5], function (errKuch) {
                    if (errKuch == null)
                        resp.send("Record Saved Successfulllyyy....Badhai");
                    else
                        resp.send(errKuch.message)

                })


              

            });

            //var respp=await run("https://res.cloudinary.com/dfyxjh3ff/image/upload/v1747073555/ed7qdfnr6hez2dxoqxzf.jpg", myprompt);
            // resp.send(respp);
            // console.log(typeof(respp));
        }
        catch (err) {
            resp.send(err.message)
        }



    }






})


async function RajeshBansalKaChirag(imgurl) {
    const myprompt = "Read the text on picture and tell all the information in adhaar card and give output STRICTLY in JSON format {adhaar_number:'', name:'', gender:'', dob: ''}. Dont give output as string. Also fix dob according to date datatype of sql"
    const imageResp = await fetch(imgurl)
        .then((response) => response.arrayBuffer());

    const result = await model.generateContent([
        {
            inlineData: {
                data: Buffer.from(imageResp).toString("base64"),
                mimeType: "image/jpeg",
            },
        },
        myprompt,
    ]);
    console.log(result.response.text())

    const cleaned = result.response.text().replace(/```json|```/g, '').trim();
    const jsonData = JSON.parse(cleaned);
    console.log(jsonData);

    return jsonData

}

//-------------------------------------------------------------

app.get("/do-update-pass", function (req, resp) {
    mySqlVen.query(
        "update sports_signup set pass=? where email=? and pass=?",
        [req.query.newpass, req.query.email, req.query.oldpass],
        function (err, result) {
            if (err) {
                resp.send("Server error");
            } 
            else if (result.affectedRows === 0) {
                resp.send("Invalid email or old password");
            } 
            else {
                resp.send("Password updated successfully");
            }
        }
    );
});


