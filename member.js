function skillsMember() {
  var member = document.getElementById("member");
  var memberValue = member.options[member.selectedIndex].value;
  var memberSkills = document.getElementById("memberSkills");
  var memberSkillsValue = memberSkills.options[memberSkills.selectedIndex].value;
  var memberSkillsText = memberSkills.options[memberSkills.selectedIndex].text;
  var output = document.getElementById("output");
  output.innerHTML = memberValue + " is a " + memberSkillsText + "!";
}