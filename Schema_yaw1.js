//Vars
var font = Render.AddFont("Verdana", 7, 400),
original_dmg = true;
//Helping functions
const keys = function() {
  is_dmg = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Damage Override")
  is_dmg1 = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Damage override key")
  isFS = UI.IsHotkeyActive("Script items", "Freestanding on quick peek") && UI.IsHotkeyActive('Misc', 'GENERAL', 'Movement', 'Auto peek')
  is_dt = UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap")
  is_hs = UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots")
  is_baim = UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim")
  is_fd = UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")
  is_ap = UI.IsHotkeyActive("Misc", "GENERAL", "Movement", "Auto peek")
  is_safe = UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point")
  is_legitaa = UI.IsHotkeyActive('Script items', 'Legit AA')
 }
 Cheat.RegisterCallback("CreateMove", "keys")

const isPistol = function(name) {
    if (name == "p2000" || name == "glock 18" || name == "dual berettas" || name == "usp s" || name == "five seven" || name == "p250" || name == "tec 9") {
            return true
    }
}
function getDropdownValue(cm, cn) {
  var co = 1 << cn;
  return cm & co ? !![] : ![];
}
const isHeavyPistol = function(name) {
    if (name == "r8 revolver" || name == "desert eagle") {
        return true
    }
}
Render.OutlineStringCustom = function(x, y, alignid, text, color, font) {
  Render.StringCustom(x - 1, y - 1, alignid, text, [0, 0, 0, color[3]], font);
  Render.StringCustom(x - 1, y, alignid, text, [0, 0, 0, color[3]], font); 

  Render.StringCustom(x - 1, y + 1, alignid, text, [0, 0, 0, color[3]], font);   
  Render.StringCustom(x, y + 1, alignid, text, [0, 0, 0, color[3]], font);

  Render.StringCustom(x, y - 1, alignid, text, [0, 0, 0, color[3]], font);
  Render.StringCustom(x + 1, y - 1, alignid, text, [0, 0, 0, color[3]], font);

  Render.StringCustom(x + 1, y, alignid, text, [0, 0, 0, color[3]], font);
  Render.StringCustom(x + 1, y + 1, alignid, text, [0, 0, 0, color[3]], font);

  Render.StringCustom(x, y, alignid, text, color, font);
}
const isAutoSniper = function(name) {
    if (name == "scar 20" || name == "g3sg1") {
        return true
    }
}
function GetVelocity(index) {
    var velocity = Entity.GetProp(index, "CBasePlayer", "m_vecVelocity[0]");
    return Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
}
//UI things

UI.AddLabel('->            ~Schema yaw~               <-');
UI.AddLabel('');
UI.AddDropdown("Sections",["Information","Rage","Anti-Aim","Visuals","Settings"]),
UI.AddMultiDropdown("Schema indicators", ["Skeet styled", "Schema Yaw", "Prediction"])
UI.AddCheckbox("Aspect Ratio")
UI.AddSliderFloat("Aspect Ratio value", 0.1, 10.0)
UI.AddColorPicker("List color")
UI.AddSliderInt("add_x", 5, 75);
UI.AddSliderInt("add_y", 5, 75);
UI.AddCheckbox("Anti-Aim preset")
UI.AddHotkey("Legit AA")
UI.AddCheckbox("[+] IDEALTICK")
UI.AddSliderInt("[+] recovery hit chance", 0, 100)
var ref_dt_hitchance = UI.GetValue("RAGE", "SCOUT", "Accuracy", "Hitchance")
UI.SetValue("Script items", "[+] recovery hit chance", ref_dt_hitchance)
UI.AddSliderInt("[+] hit chance", 0, 100)
UI.SetValue("Script items", "[+] hit chance", 35)
UI.AddCheckbox("Minimum damage override");
UI.AddHotkey("Damage Override");
UI.AddSliderInt("Pistol Damage", 0, 130);
UI.AddSliderInt("Heavy Pistols Damage", 0, 130);
UI.AddSliderInt("Scout Damage", 0, 130);
UI.AddSliderInt("AWP Damage", 0, 130);
UI.AddSliderInt("Auto Damage", 0, 130);
UI.AddLabel('->            ~Schema yaw~               <-');
const sections = function() {
	UI.SetValue("Script items", " ", 1);
	const tab = UI.GetValue("Script items", "Sections")
	info_tab = tab == 0;
	rage_tab = tab == 1;
	antiaim_tab = tab == 2;
	visual_tab = tab == 3;
	settings_tab = tab == 4;
	if (UI.IsMenuOpen()) {
    UI.SetEnabled("Script items", "[+] IDEALTICK", rage_tab)
    UI.SetEnabled("Script items", "[+] recovery hit chance", rage_tab && UI.GetValue("Script items", "[+] IDEALTICK"))
    UI.SetEnabled("[+] hit chance", rage_tab && UI.GetValue("Script items", "[+] IDEALTICK"))
  	UI.SetEnabled("Script items", 'Minimum damage override', rage_tab);
    UI.SetEnabled("Script items", "Schema indicators", visual_tab);
    UI.SetEnabled("Script items", "List color", visual_tab)
    UI.SetEnabled("Script items", "add_x", visual_tab);
    UI.SetEnabled("Script items", "add_y", visual_tab);
    UI.SetEnabled("Script items", "Aspect Ratio", visual_tab)
    UI.SetEnabled("Script items", "Aspect Ratio value", visual_tab)
    UI.SetEnabled("Script items", "Legit AA", antiaim_tab)
    UI.SetEnabled("Script items", "Anti-Aim preset", antiaim_tab)

    UI.SetEnabled("Script items", "add_x", visual_tab && getDropdownValue(UI.GetValue('Script items', 'Schema indicators'), 1))
    UI.SetEnabled("Script items", "add_y", visual_tab && getDropdownValue(UI.GetValue('Script items', 'Schema indicators'), 1))
    UI.SetEnabled("Script items", "Aspect Ratio value", visual_tab && UI.GetValue("Script items", "Aspect Ratio"))
    UI.SetEnabled("Script items", "List color", visual_tab && getDropdownValue(UI.GetValue('Script items', 'Schema indicators'), 2))

    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Damage Override", rage_tab && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Minimum damage override"));
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Pistol Damage", rage_tab && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Minimum damage override"));
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Heavy Pistols Damage", rage_tab && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Minimum damage override"));
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Scout Damage", rage_tab && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Minimum damage override"));
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "AWP Damage", rage_tab && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Minimum damage override"));
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Auto Damage", rage_tab && UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Minimum damage override"));
  }
}

//Min damage
const mindmg = function()
{
    pm = UI.GetValue("Script items", "Pistol Damage"),
    hpm = UI.GetValue("Script items", "Heavy Pistols Damage"),
    sm = UI.GetValue("Script items", "Scout Damage"),
    awm = UI.GetValue("Script items", "AWP Damage"),
    am = UI.GetValue("Script items", "Auto Damage"),
    name = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    if (is_dmg)
    {
        if (original_dmg)
        {
            pc = UI.GetValue("Rage", "PISTOL", "Minimum damage")
            hpc = UI.GetValue("Rage", "HEAVY PISTOL", "Minimum damage")
            scc = UI.GetValue("Rage", "SCOUT", "Minimum damage")
            awpc = UI.GetValue("Rage", "AWP", "Minimum damage")
            atc = UI.GetValue("Rage", "AUTOSNIPER", "Minimum damage")
            original_dmg = false;
        }
        if (isPistol(name))
        {
        UI.SetValue("Rage", "PISTOL", "Minimum damage", pm)
        }
        if (isHeavyPistol(name))
        {
        UI.SetValue("Rage", "HEAVY PISTOL", "Minimum damage", hpm)
        }
        if (name == "ssg 08")
        {
        UI.SetValue("Rage", "SCOUT", "Minimum damage", sm)
        }
        if (name == "awp")
        {
        UI.SetValue("Rage", "AWP", "Minimum damage", awm)
        }
        if (isAutoSniper(name))
        {
        UI.SetValue("Rage", "AUTOSNIPER", "Minimum damage", am)
        }
    }
    else
    {
        if (!original_dmg)
        {
            UI.SetValue("Rage", "PISTOL", "Minimum damage", pc)
            UI.SetValue("Rage", "HEAVY PISTOL", "Minimum damage", hpc)
            UI.SetValue("Rage", "SCOUT", "Minimum damage", scc)
            UI.SetValue("Rage", "AWP", "Minimum damage", awpc)
            UI.SetValue("Rage", "AUTOSNIPER", "Minimum damage", atc)
            original_dmg = true;
        }
    }
}

var screen_size = Global.GetScreenSize();
var add_y = 0

function schemaindicators1(){
  indicatorsEnabled = UI.GetValue('Script items', 'Schema indicators');
    if(getDropdownValue(indicatorsEnabled, 1)) {
    real_yaw = Local.GetRealYaw();
    fake_yaw = Local.GetFakeYaw();
    delta = Math.min(Math.abs(real_yaw - fake_yaw) /2, 60).toFixed(0);
    font = Render.AddFont("Calibri", 8, 500);
    add_x = UI.GetValue("Script items", "add_x")
    add_y = UI.GetValue("Script items", "add_y")
    
    if(Entity.IsAlive(Entity.GetLocalPlayer())){
    Render.StringCustom(screen_size[0] / 2 + 2 + add_x, screen_size[1] / 2 + add_y + 1, 0, "SCHEMA YAW", [0, 0, 0, 255], font);
    Render.StringCustom(screen_size[0] / 2 + 2 + add_x, screen_size[1] / 2 + add_y, 0, "SCHEMA YAW", delta < 24 ? [0, 128, 0, 200] : [220, 135, 49, 255], font);
    if(isFS) {
        add_y = add_y + 11
        Render.StringCustom(screen_size[0] / 2 + 2 + add_x, screen_size[1] / 2 + add_y + 1, 0, "DEFAULT", [0, 0, 0, 255], font);
        Render.StringCustom(screen_size[0] / 2 + 2 + add_x, screen_size[1] / 2 + add_y, 0, "DEFAULT", [255, 0, 0, 255], font);
    } else {
        add_y = add_y + 11
        Render.StringCustom(screen_size[0] / 2 + 2 + add_x, screen_size[1] / 2 + add_y + 1, 0, "DYNAMIC", [0, 0, 0, 255], font);
        Render.StringCustom(screen_size[0] / 2 + 2 + add_x, screen_size[1] / 2 + add_y, 0, "DYNAMIC", [209, 159, 230, 255], font);
    }
    if(is_dt) {
        add_y = add_y + 11
        Render.StringCustom(screen_size[0] / 2 + 2 + add_x, screen_size[1] / 2 + add_y + 1, 0, "DT", [0, 0, 0, 255], font);
        Render.StringCustom(screen_size[0] / 2 + 2 + add_x, screen_size[1] / 2 + add_y, 0, "DT", Exploit.GetCharge() == 1 ? [25, 255, 25, 255] : [255, 0, 0, 255], font);
    }
    if(is_hs) {
        add_y = add_y + 11
        Render.StringCustom(screen_size[0] / 2 + 2 + add_x, screen_size[1] / 2 + add_y + 1, 0, "AA", [0, 0, 0, 255], font);
        Render.StringCustom(screen_size[0] / 2 + 2 + add_x, screen_size[1] / 2 + add_y, 0, "AA", [255, 255, 255, 255], font);
    }
    if(is_dmg1) {
        add_y = add_y + 11
        Render.StringCustom(screen_size[0] / 2 + 2 + add_x, screen_size[1] / 2 + add_y + 1, 0, "DMG", [0, 0, 0, 255], font);
        Render.StringCustom(screen_size[0] / 2 + 2 + add_x, screen_size[1] / 2 + add_y, 0, "DMG", [200, 185, 255, 255], font);
    }
    if(is_baim) {
        add_y = add_y + 11
        Render.StringCustom(screen_size[0] / 2 + 2 + add_x, screen_size[1] / 2 + add_y + 1, 0, "BODY", [0, 0, 0, 255], font);
        Render.StringCustom(screen_size[0] / 2 + 2 + add_x, screen_size[1] / 2 + add_y, 0, "BODY", [9, 228, 155, 255], font);
            }
        }
    }
}

add_y1 = 0
var indicator = {
	on_draw: function() {
    indicatorsEnabled = UI.GetValue('Script items', 'Schema indicators');
    if(getDropdownValue(indicatorsEnabled, 2)) {

		var verdana = Render.AddFont("Verdana", 7, 600)
		var small = Render.AddFont("Small fonts", 5, 100)
    var color = UI.GetColor("Script items", "List color")

		var size = Render.GetScreenSize()
		var bodyyaw = Local.GetRealYaw() - Local.GetFakeYaw()

		Render.StringCustom((size[0] / 2) - (Render.TextSizeCustom("prediction", verdana)[0] / 2), (size[1] / 2) - (Render.TextSizeCustom("prediction", verdana)[1] / 2 - 60) + 1, 0, "prediction", [0, 0, 0, 200], verdana)
		Render.StringCustom((size[0] / 2) - (Render.TextSizeCustom("prediction", verdana)[0] / 2), (size[1] / 2) - (Render.TextSizeCustom("prediction", verdana)[1] / 2 - 61), 0, "predi", bodyyaw > 0 ? [30, 144, 255, 255] : [255, 255, 255, 255], verdana)
		Render.StringCustom((size[0] / 2) - (Render.TextSizeCustom("prediction", verdana)[0] / 2) + Render.TextSizeCustom("predi", verdana)[0], (size[1] / 2 - 60) - (Render.TextSizeCustom("prediction", verdana)[1] / 2 - 121), 0, "ction", bodyyaw < 0 ? [30, 144, 255, 255] : [255, 255, 255, 255], verdana)
		Render.FilledRect((size[0] / 2) - (Render.TextSizeCustom("prediction", verdana)[0] / 2) - 2, (size[1] / 2 + 60) - (Render.TextSizeCustom("prediction", verdana)[1] / 2) + Render.TextSizeCustom("prediction", verdana)[1] + 2, Render.TextSizeCustom("prediction", verdana)[0] + 4, 1, [255, 255, 255, 255])
		Render.Circle((size[0] / 2) + (Render.TextSizeCustom("prediction", verdana)[0] / 2) + 1, (size[1] / 2 + 1) - (Render.TextSizeCustom("prediction", verdana)[1] / 2 - 60) + 1, 2, [0, 0, 0, 255])
		Render.Circle((size[0] / 2) + (Render.TextSizeCustom("prediction", verdana)[0] / 2) + 1, (size[1] / 2) - (Render.TextSizeCustom("prediction", verdana)[1] / 2 - 60) + 1, 2, [255, 255, 255, 255])

		if (is_dt){
		 Render.OutlineStringCustom((size[0] / 2) - (Render.TextSizeCustom("DT", small)[0] / 2), (size[1] / 2 + 50) + (11 + 10), 0, "DT", color, small)
	  }
    else {
      Render.OutlineStringCustom((size[0] / 2) - (Render.TextSizeCustom("DT", small)[0] / 2), (size[1] / 2 + 50) + (11 + 10), 0, "DT", [255, 255, 255, 255], small)
    }
    if (is_hs){
		 Render.OutlineStringCustom((size[0] / 2) - (Render.TextSizeCustom("OSAA", small)[0] / 2), (size[1] / 2 + 60) + (11 + 10), 0, "OSAA", color, small)
	  }
    else {
      Render.OutlineStringCustom((size[0] / 2) - (Render.TextSizeCustom("OSAA", small)[0] / 2), (size[1] / 2 + 60) + (11 + 10), 0, "OSAA", [255, 255, 255, 255], small)
    }
    if (is_ap) {
      Render.OutlineStringCustom((size[0] / 2) - (Render.TextSizeCustom("QUICKPEEK", small)[0] / 2), (size[1] / 2 + 70) + (11 + 10), 0, "QUICKPEEK", color, small)
    }
    else {
      Render.OutlineStringCustom((size[0] / 2) - (Render.TextSizeCustom("QUICKPEEK", small)[0] / 2), (size[1] / 2 + 70) + (11 + 10), 0, "QUICKPEEK", [255, 255, 255, 255], small)
    }
    if (is_safe) {
		 Render.OutlineStringCustom((size[0] / 2) - (Render.TextSizeCustom("SAFE", small)[0] / 2), (size[1] / 2 + 80) + (11 + 10), 0, "SAFE", color, small)
	  }
    else {
      Render.OutlineStringCustom((size[0] / 2) - (Render.TextSizeCustom("SAFE", small)[0] / 2), (size[1] / 2 + 80) + (11 + 10), 0, "SAFE", [255, 255, 255, 255], small)
    }
      if (!is_fd && (UI.GetValue("Rage", "GENERAL", "Exploits", "Doubletap") && is_dt && UI.GetValue("Misc", "GENERAL", "Movement", "Auto peek") && is_ap && UI.GetValue("Script items", "[+] IDEALTICK"))) {
        var small = Render.AddFont("Small fonts", 5, 100)
        Render.OutlineStringCustom((size[0] / 2 - 25), (size[1] / 2 + 20), 0, "+IDEAL TICK+", [32, 178, 170, 255], small)
        Render.OutlineStringCustom((size[0] / 2 - 70), (size[1] / 2 + 30), 0, "TELEPORTINACCURACYAPPROVE>(?X)", [32, 178, 170, 255], small)
      }
    }
  }
}



var ref_dt_hitchance = UI.GetValue("RAGE", "SCOUT", "Accuracy", "Hitchance")
var ref_dt_quick_stop = UI.GetValue("RAGE", "SCOUT", "Accuracy", "Auto stop mode")

var ref_fakelag_limit = UI.GetValue("Anti-Aim", "Fake-Lag", "Limit")
var ref_maxusrcmdprocessticks = Convar.GetInt("sv_maxusrcmdprocessticks")

function idealtick() {
  var recovery_hc = UI.GetValue("Script items", "[+] recovery hit chance")
  var dt_hc = UI.GetValue("Script items", "[+] hit chance")
  var is_doubletapping = UI.GetValue("Rage", "GENERAL", "Exploits", "Doubletap") && is_dt
  var is_quickpeeking = UI.GetValue("Misc", "GENERAL", "Movement", "Auto peek") && is_ap

  var applied_fakelag = ref_maxusrcmdprocessticks - 1
  var applied_dt_hc = recovery_hc
  var applied_dt_quickstop = 0

  if (!is_fd && (is_doubletapping && is_quickpeeking && UI.GetValue("Script items", "[+] IDEALTICK"))) {
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction", 1)
    var applied_fakelag = 1
    var applied_dt_hc = dt_hc
    var applied_dt_quickstop = 2
  }
  if (is_ap && UI.GetValue("Script items", "[+] IDEALTICK")) {
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction", 1)
  }
  else {
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction", 0)
  }
    UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", applied_fakelag)
  UI.SetValue("RAGE", "SCOUT", "Accuracy", "Hitchance", applied_dt_hc)
  UI.SetValue("RAGE", "SCOUT", "Accuracy", "Auto stop mode", applied_dt_quickstop)
}
function idealtick_unload() {
  UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", applied_fakelag)
  UI.SetValue("RAGE", "SCOUT", "Accuracy", "Hitchance", applied_dt_hc)
  UI.SetValue("RAGE", "SCOUT", "Accuracy", "Auto stop mode", applied_dt_quickstop)
}

var screen_size = Global.GetScreenSize();
var x = Global.GetScreenSize()[0] / 2;
var y = Global.GetScreenSize()[1] / 2 + 65;
var x1 = Global.GetScreenSize()[0]

function getVelocity(index) {
    players = Entity.GetPlayers();
    for (i = 0; i < players.length; i++) {
        ;
    }; {
        var velocity = Entity.GetProp(index, 'CBasePlayer', 'm_vecVelocity[0]');
        var velocity_result = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1])
    }
    return velocity_result
}




var Inair = function() {
  if(!(Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_fFlags") & (1 << 0))) {
      return true;
  } else {
      return false;
  }
}

var getVelocity = function(index) {
  players = Entity.GetPlayers();
  for(i = 0; i < players.length; i++); {
      var velocity = Entity.GetProp(index, "CBasePlayer", "m_vecVelocity[0]");
      var speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
  }
  return speed;
}

Render.Arc = function (x, y, radius, radius_inner, start_angle, end_angle, segments, color)
{
  segments = 360 / segments;

  for (var i = start_angle; i < start_angle + end_angle; i = i + segments)
  {

      var rad = i * Math.PI / 180;
      var rad2 = (i + segments) * Math.PI / 180;

      var rad_cos = Math.cos(rad);
      var rad_sin = Math.sin(rad);

      var rad2_cos = Math.cos(rad2);
      var rad2_sin = Math.sin(rad2);

      var x1_inner = x + rad_cos * radius_inner;
      var y1_inner = y + rad_sin * radius_inner;

      var x1_outer = x + rad_cos * radius;
      var y1_outer = y + rad_sin * radius;

      var x2_inner = x + rad2_cos * radius_inner;
      var y2_inner = y + rad2_sin * radius_inner;

      var x2_outer = x + rad2_cos * radius;
      var y2_outer = y + rad2_sin * radius;
      Render.Polygon( [
          [ x1_outer, y1_outer ],
          [ x2_outer, y2_outer ],
          [ x1_inner, y1_inner ] ],
          color
      );

      Render.Polygon( [
          [ x1_inner, y1_inner ],
          [ x2_outer, y2_outer ],
          [ x2_inner, y2_inner ] ],
          color
      );
  }
}

var add_y = 0
function schemaindicators2(){
if (Entity.IsAlive(Entity.GetLocalPlayer())) 
  fonts = Render.AddFont("Calibri", 18, 900)
  fake = Local.GetFakeYaw();
  real = Local.GetRealYaw();
  delta = Math.min(Math.abs(real - fake) /2, 60).toFixed(0);
  velocity = Math.round(getVelocity(Entity.GetLocalPlayer())).toString();
  screen_size = Global.GetScreenSize();
  x = screen_size[0];
  y = screen_size[1];
  add_y = 0
  Render.Style = function(text, col) {
      x = screen_size[0] / 100
      y = screen_size[1] / 1.33
      fonts = Render.AddFont("Calibri", 18, 900)
      text_size = Render.TextSizeCustom(text, fonts)
      width = text_size[0] - 2;
      add_y = add_y + 33
      Render.GradientRect(13, y - add_y + 2, width / 2, 26, 1, [0, 0, 0, 0], [0, 0, 0, 55]);
      Render.GradientRect(13 + width / 2, y - add_y + 2, width / 2, 26, 1, [0, 0, 0, 55], [0, 0, 0, 0]);
      Render.StringCustom(x, y + 1 - add_y, 0, text, [33, 33, 33, 180], fonts)
      Render.StringCustom(x, y - add_y, 0, text, col, fonts)
  }

  //render
  
  if(getDropdownValue(indicatorsEnabled, 0)) {
      fake_sz = Render.TextSizeCustom("FAKE", fonts)[0] + 15;
      Render.Style("FAKE", [255 - (delta * 2.29824561404), delta * 3.42105263158, delta * 0.22807017543, 255])
      Render.Arc(x + fake_sz - 3, y - add_y + 15,10,5,0,360,120,[17, 17, 17,255])
      Render.Arc(x + fake_sz - 3, y - add_y + 15,9,6,0,delta / 60 * 360,120,[255 - (delta * 2.29824561404), delta * 3.42105263158, delta * 0.22807017543, 255])
  if(velocity > 255 || Inair()) {
      Render.Style("LC", velocity > 275 ? [132, 195, 16, 255] : [255, 0, 0, 255])
  }
  if(is_fd) {
      Render.Style("DUCK", [255, 255, 255, 255])
  }
  if(is_baim) {
      Render.Style("BAIM", [255, 0, 0, 255])
  }
  if(is_safe) {
      Render.Style("SAFE", [132, 195, 16, 255])
  }
  if(UI.GetValue("Miscellaneous", "Extended backtracking")) {
      Render.Style("PING", [255 - ((Entity.GetProp(Entity.GetLocalPlayer(), "CPlayerResource", "m_iPing") / 189 * 60) * 2.29824561404), (Entity.GetProp(Entity.GetLocalPlayer(), "CPlayerResource", "m_iPing") / 189 * 60) * 3.42105263158, (Entity.GetProp(Entity.GetLocalPlayer(), "CPlayerResource", "m_iPing") / 189 * 60) * 0.22807017543, 255])
  }
  name1 = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
  if(is_dmg) {
    if (isPistol(name1)) {
      damagg = UI.GetValue("Script items", "Pistol Damage")
    } else if (isHeavyPistol(name1)) {
      damagg = UI.GetValue("Script items", "Heavy Pistols Damage")
    } else if (name1 == "ssg 08") {
      damagg = UI.GetValue("Script items", "Scout Damage")
    } else if (name1 == "awp") {
      damagg = UI.GetValue("Script items", "AWP Damage")
    } else if (isAutoSniper(name1)) {
      damagg = UI.GetValue("Script items", "Auto Damage")
    }
      Render.Style("Damage : " + damagg + "", [255, 255, 255, 255]);
  }
  if(UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction")) {
      Render.Style("FS", [132, 195, 16, 255]);
  }
  if(is_hs) {
      Render.Style("ONSHOT", [132, 195, 16, 255])
  }
  if(is_dt) {
      Render.Style("DT", Exploit.GetCharge() == 1 ? [255, 255, 255, 255] : [255, 0, 0, 255])
   }
  }
}
function betterantiaim() {

    var localplayer = Entity.GetLocalPlayer();
    if(UI.GetValue("Script items", "Anti-Aim preset")) {
        if(GetVelocity(localplayer) < 1) {
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 10)
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 5)
            }
        else if(GetVelocity(localplayer) > 1) {
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 14)
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 15)
        }
    }
    else if(Input.IsKeyPressed(0x20)) {
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 24)
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 12)
    }
}

function aspectratio() {
  var stringratio = UI.GetValue('Script items', 'Aspect Ratio value').toString();
  Convar.SetString('r_aspectratio', stringratio);
}

var legitaa_time = Global.Realtime();
var E = !![];
var defuse = ![];
var distance = 0;
var distance1 = 0;
var original_aa = !![];
var planting = ![];
var fill = 0;
var isbomb = 0;
var bombsiteonplant = '';
var on_plant_time;

function legit_aa2() {
  if (is_legitaa) {
    if (original_aa) {
      restrictions_cache = UI.GetValue('Misc', 'PERFORMANCE & INFORMATION', 'Information', 'Restrictions');
      yaw_offset_cache = UI.GetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset');
      jitter_offset_cache = UI.GetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset');
      pitch_cache = UI.GetValue('Anti-Aim', 'Extra', 'Pitch');
      original_aa = ![];
    };
    UI.SetValue('Misc', 'PERFORMANCE & INFORMATION', 'Information', 'Restrictions', 0);
    UI.SetValue('Anti-Aim', 'Extra', 'Pitch', 0);
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", 0);
    UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset', 180);
    UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset', 0);
    AntiAim.SetOverride(0);
    if (is_legitaa) {
      E = ![];
      if (Globals.Realtime() > legitaa_time) {
        if (E == ![]) {
          Cheat.ExecuteCommand('+use');
          E = !![];
        };
        if (E == !![]) {
          Cheat.ExecuteCommand('-use');
        }
      }
    } else {
      if (E == !![]) {
        Cheat.ExecuteCommand('-use');
        E = ![];
      }
    }
  } else {
    if (!original_aa) {
      UI.SetValue('Misc', 'PERFORMANCE & INFORMATION', 'Information', 'Restrictions', restrictions_cache);
      UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset', yaw_offset_cache);
      UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", 1);
      UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Jitter offset', jitter_offset_cache);
      UI.SetValue('Anti-Aim', 'Extra', 'Pitch', pitch_cache);
      original_aa = !![];
    };
    legitaa_time = Global.Realtime();
  }
}

function legit_aa() {
  var qw = Entity.GetEntitiesByClassID(129)[0];
  var qx = Entity.GetEntitiesByClassID(97)[0];
  if (qw) {
    var qy = Entity.GetRenderOrigin(qw);
    var qz = Entity.GetLocalPlayer();
    var ra = Entity.GetRenderOrigin(qz);
    distance = calcDist(qy, ra);
    if (distance >= 100) {
      legit_aa2();
    }
  } else {
    if (qx) {
      var rb = Entity.GetRenderOrigin(qx);
      var qz = Entity.GetLocalPlayer();
      var ra = Entity.GetRenderOrigin(qz);
      distance1 = calcDist(rb, ra);
      if (distance1 >= 100) {
        legit_aa2();
      }
    } else {
      legit_aa2();
    }
  }
}

function player_connect() {
  lastPressed = Global.Tickcount();
  oldTick = Global.Tickcount();
  on_plant_time = 0;
  fill = 0;
  planting = ![];
  var rc = Entity.GetEntitiesByClassID(129)[0];
  if (rc == undefined) {
    return;
  }
}

// UI
Global.RegisterCallback("Draw","sections"),
// UI
Cheat.RegisterCallback("CreateMove", "mindmg"),
// indicators
Cheat.RegisterCallback("Draw", "schemaindicators1")
Global.RegisterCallback("Draw", "schemaindicators2");
Cheat.RegisterCallback("Draw", "indicator.on_draw")
Cheat.RegisterCallback("CreateMove", "getVelocity");
// indicators

// Anti-Aim
Cheat.RegisterCallback("CreateMove", "betterantiaim")
Cheat.RegisterCallback('CreateMove', 'legit_aa');
Cheat.RegisterCallback("CreateMove", "idealtick")
Cheat.RegisterCallback("Unload", "idealtick_unload")
// Anti-Aim


Cheat.RegisterCallback("Draw", "aspectratio")
Cheat.RegisterCallback('player_connect_full', 'player_connect');








Cheat.PrintColor([86,174,199, 255],    "   ▄████████  ▄████████    ▄█    █▄       ▄████████   ▄▄▄▄███▄▄▄▄      ▄████████   " + "\n"),
Cheat.PrintColor([86,161,199, 255],    "  ███    ███ ███    ███   ███    ███     ███    ███ ▄██▀▀▀███▀▀▀██▄   ███    ███   " + "\n"),
Cheat.PrintColor([86,148,199, 255],    "  ███    █▀  ███    █▀    ███    ███     ███    █▀  ███   ███   ███   ███    ███   " + "\n"),
Cheat.PrintColor([86,135,199, 255],    "  ███        ███         ▄███▄▄▄▄███▄▄  ▄███▄▄▄     ███   ███   ███   ███    ███   " + "\n"),
Cheat.PrintColor([86,122,199, 255],    "▀███████████ ███        ▀▀███▀▀▀▀███▀  ▀▀███▀▀▀     ███   ███   ███ ▀███████████   " + "\n"),
Cheat.PrintColor([86,109,199, 255],    "         ███ ███    █▄    ███    ███     ███    █▄  ███   ███   ███   ███    ███   " + "\n"),
Cheat.PrintColor([86,96,199, 255],     "   ▄█    ███ ███    ███   ███    ███     ███    ███ ███   ███   ███   ███    ███   " + "\n"),
Cheat.PrintColor([86,83,199, 255],     " ▄████████▀  ████████▀    ███    █▀      ██████████  ▀█   ███   █▀    ███    █▀    " + "\n"),
Cheat.PrintColor([130, 130, 255, 255], "\n"),
Cheat.PrintColor([130, 130, 255, 255], "\n"),
Cheat.PrintColor([130, 130, 255, 255], "\n"),
Cheat.PrintColor([255, 255, 255, 255], "                       ▄██   ▄      ▄████████  ▄█     █▄    " + "\n"),
Cheat.PrintColor([255, 255, 255, 255], "                       ███   ██▄   ███    ███ ███     ███   " + "\n"),
Cheat.PrintColor([255, 255, 255, 255], "                       ███▄▄▄███   ███    ███ ███     ███   " + "\n"),
Cheat.PrintColor([255, 255, 255, 255], "                       ▀▀▀▀▀▀███   ███    ███ ███     ███   " + "\n"),
Cheat.PrintColor([255, 255, 255, 255], "                       ▄██   ███ ▀███████████ ███     ███   " + "\n"),
Cheat.PrintColor([255, 255, 255, 255], "                       ███   ███   ███    ███ ███     ███   " + "\n"),
Cheat.PrintColor([255, 255, 255, 255], "                       ███   ███   ███    ███ ███ ▄█▄ ███   " + "\n"),
Cheat.PrintColor([255, 255, 255, 255], "                        ▀█████▀    ███    █▀   ▀███▀███▀    " + "\n")