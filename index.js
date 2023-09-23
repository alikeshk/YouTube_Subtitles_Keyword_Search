// Added 'getCurrentTab'
import { getCurrentTab } from "./utilities.js";

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getCurrentTab();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
  
    // const currentVideo = urlParameters.get("v");
  
    if (activeTab.url.includes("youtube.com/results")) {
      
    } else {
      const container = document.getElementsByClassName("container")[0];
  
      container.innerHTML = '<div class="title">This is not a youtube search page.</div>';
    }
  });

//   function makeLists(array1, array2, outputElementId1, outputElementId2) {

//     var outputElement1 = document.getElementById(outputElementId1);
//     var outputElement2 = document.getElementById(outputElementId2);
//     //the output elements ID for the html

//     var list1 = document.createElement('ul');
//     var list2 = document.createElement('ul');
//     //This is to create the main lists

//     for (var i = 0; i < array1.length; i++) {
//       var li = document.createElement('li');
//       li.textContent = array1[i];
//       list1.appendChild(li);
//     }
//     //This is to "listify" the first array into an unordered list

//     for (var i = 0; i < array2.length; i++) {
//       var li = document.createElement('li');
//       li.textContent = array2[i];
//       list2.appendChild(li);
//     }
//     //This is to "listify" the second array into an unordered list

//     outputElement1.appendChild(ul1);
//     outputElement2.appendChild(ul2);    
//   }