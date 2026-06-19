function load_cd_from_xml(xmlDoc, body_cd)
{
    var cd_tags = xmlDoc.getElementsByTagName("CD");
    for(i=0; i<cd_tags.length; i++)
    {
        cd_tag = cd_tags[i];
        title_tag = cd_tag.getElementsByTagName("TITLE")[0];
        artist_tag = cd_tag.getElementsByTagName("ARTIST")[0];
        title = title_tag.childNodes[0].nodeValue;
        artist = artist_tag.childNodes[0].nodeValue;
        
        tr = document.createElement("tr");
        td_artist = document.createElement("td");
        td_title = document.createElement("td");
        
        td_artist.innerHTML = artist;
        td_title.innerHTML = title;
        
        tr.appendChild(td_artist);
        tr.appendChild(td_title);
        
        body_cd.appendChild(tr);
    }
}
