pragma solidity ^0.4.0;

contract mobilechain{
    uint m_id = 99;
    uint u_id = 100;
   
    function totMobile() returns (uint){
        return m_id;
    }
   
    struct track {
        uint mobileid;
        uint owner_id;
        address owner;
    }    

    mapping (uint => track[]) tracks;
    
    function getLength(uint _mid) returns (uint) {
        return tracks[_mid].length;
    }
    
    function gettrack(uint mid, uint id) returns (uint, uint , address){
        track t = tracks[mid][id];
        return (t.mobileid, t.owner_id, t.owner);
    }
        
    struct mobile {
        bytes32 mtype;
        bytes32 mname;
        bytes32 mspecs;
        address ownership;
    }
    
    mapping (uint => mobile) mobiles;
    
    modifier onlyOwner(uint id){
        if(msg.sender != mobiles[id].ownership) throw;
        _;
    }
    
    function setMobile(uint sid, bytes32 types, bytes32 name, bytes32 specs) returns (uint){
        if(stakeholders[sid].type_user == "Manufacturer"){
            uint mobId = m_id+1;
            
            mobiles[mobId].mtype = types;
            mobiles[mobId].mname = name;
            mobiles[mobId].ownership = stakeholders[sid].USERAddress;
            mobiles[mobId].mspecs = specs;
            
            track t;
            t.mobileid = mobId;
            t.owner = stakeholders[sid].USERAddress;
            t.owner_id = sid; 
            tracks[mobId].push(t);
             
            return mobId;
        }else return 0;
    } 
    
    function getMobile(uint id) returns(bytes32, bytes32, address, bytes32){
        return (mobiles[id].mtype, mobiles[id].mname, mobiles[id].ownership, mobiles[id].mspecs);
    }

    //======================================================================================
    //Stakeholders of Mobile Phone
    struct stakeholder {
        bytes32 name;
        bytes32 password; 
        address USERAddress;
        bytes32 type_user;
    }
    
    mapping(uint => stakeholder) stakeholders;
    
    function setstakeholders(bytes32 _name, bytes32 pass, address Add, bytes32 typeuser) returns(uint){
        uint id = u_id++;
        stakeholders[id].name = _name;
        stakeholders[id].password = pass;
        stakeholders[id].USERAddress = Add;
        stakeholders[id].type_user = typeuser;
        return id;
    }
    
    function getstakeholders(uint id) returns (bytes32 , bytes32 , address , bytes32 ){
        return (stakeholders[id].name,  stakeholders[id].password , stakeholders[id].USERAddress, stakeholders  [id].type_user);
    }
    
    //==================================================================================
    //Login StakeHolders
    function login (uint id, bytes32 pass, bytes32 types) returns (bool){
        if(stakeholders[id].type_user == types){    
            if(stakeholders[id].password == pass){
                return true;
            }
        }
        return false;
    }
    
    
    //Transfer the mobile(m_id) from one stakeholder(u_id1) to another stakeholder(u_id2). 
    function transferOwnershipOfMobile(uint u_id1, uint u_id2, uint _mid) onlyOwner(_mid) returns (bool){
        stakeholder s1 = stakeholders[u_id1];
        stakeholder s2 = stakeholders[u_id2];
        track t;
        if(s1.type_user == "Manufacturer" && s2.type_user == "Distributor"){
            t.mobileid = _mid;
            t.owner=stakeholders[u_id2].USERAddress;
            t.owner_id = u_id2;
            tracks[_mid].push(t);
            mobiles[_mid].ownership = s2.USERAddress;
           return (true);
        }
        else if(s1.type_user =="Distributor" && s2.type_user == "User"){
            t.mobileid = _mid;
            t.owner=stakeholders[u_id2].USERAddress;
            t.owner_id = u_id2;
            tracks[_mid].push(t);
            mobiles[_mid].ownership = s2.USERAddress;
           return  (true);
        }
        else 
            return (false);
        
        
    }
    
    
     
}