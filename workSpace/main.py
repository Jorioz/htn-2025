import requests
import power_monitor
id = None

pm = PowerMonitor()

while True:
  if(id == None): 
    c = requests.get("http://10.37.127.240:3000/api/connect")
    id = str(c.json()['userid'])
  if('stop' in c.content):
    if(c.content['stop'] == "true"):
      stop = requests.get("http://10.37.127.240:3000/api/stop?userid="+id)
      id = None
      
  if(id != None):
      send = requests.get("http://10.37.127.240:3000/api/power?voltage="+str(pm.read().scaled.voltage)+"&current="+str(pm.read().scaled.current)+"&power="+str(pm.read().scaled.power)+"&userid="+id)
  if(id != None):
      led21.value(1)
      led22.value(1)
  else:
      led21.value(0)
      led22.value(0)
  
  
