# iHost Hardware Control  Add-on

#### Introduction 

iHost Hardware Control add-on registers buttons and indicators on the iHost as entities in Home Assistant, allowing users to configure automation rules for button and indicator entities directly in Home Assistant for more flexible control of hardware interactions.

#### Prerequisites 

- Booting and running Home Assistant on iHost via a pre-flashed microSD card is required to use the **iHost Hardware Control** add-on, as it enables iHost's button and indicator functions. See the [Operation Guide](https://github.com/iHost-Open-Source-Project/ha-operating-system?tab=readme-ov-file#readme) for more details. 

#### Install iHost Hardware Control Add-on

##### Add to Repository

1. Navigate to the Add-on Store > Click the More button in the upper right corner > Select Repository;
2. Enter the URL in the input box: [https://github.com/iHost-Open-Source- Project/hassio-ihost-addon](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon); 
3. Alternatively, click this button to add it automatically.

![img](https://cdn.nlark.com/yuque/0/2025/png/21644839/1744203684758-1382de38-32da-43d4-b27b-b483be8c0b29.png)

##### Install **iHost Hardware Control**  Add-on

1. Search for **iHost Hardware Control** in the Add-ons Store; 
2. Click **Install**;

![img](https://cdn.nlark.com/yuque/0/2025/png/21644839/1744289361284-e9b7410a-5a30-4e05-b80a-4cffd152cba1.png)

3. Wait for the installation to complete.

##### Start **iHost Hardware Control**  Add-on

Click the “start” button after the installation is complete and wait for the start to finish

Since the iHost Hardware Control add-on relies on MQTT, the Mosquitto broker add-on is automatically installed and started for you when you start the iHost Hardware Control add-on, you need to wait a few minutes to see the Mosquitto broker plugin in the add-ons list.

![img](https://cdn.nlark.com/yuque/0/2025/png/21644839/1744281720922-82e617c8-7ee4-432f-b46a-3810f9076934.png)

![img](https://cdn.nlark.com/yuque/0/2025/png/21644839/1744290920248-81553b88-a9ce-4684-b570-a06d89523401.png)



##### Install MQTT integrations

Please go to Settings -> Devices & Services -> click the Add button for MQTT Integration and wait for the addition to complete.

![img](https://cdn.nlark.com/yuque/0/2025/png/21644839/1744281297071-20770423-38b8-4242-9ef8-657eeae47902.png)

![img](https://cdn.nlark.com/yuque/0/2025/png/21644839/1744281547123-ef41e4fc-0fc9-490a-8de7-9115bd7f9a0e.png)

#### Check iHost Buttons and Indicators in MQTT Integrations

After successfully installing and launching the **iHost Hardware Control** add-on as described above, you can see the buttons and indicators on iHost in the **MQTT** integration.
![img](https://cdn.nlark.com/yuque/0/2025/png/21914003/1744170890004-c0b05a31-f66e-4e5f-a91c-a83d33c36c5f.png)





##### iHost Buttons and Its Entities

There are 4 buttons on the top of the iHost: for power, pairing, mute, and security. A reset button in a small hole on the side of iHost, all these 5 buttons exist as a device named **iHost buttons**, with 5 <event> entities, as following: 

Note: iHost power button pressed and held for 10s will shut down from hardware.

![image-20250411154900741](C:\Users\coolkit\AppData\Roaming\Typora\typora-user-images\image-20250411154900741.png)

![img](https://cdn.nlark.com/yuque/0/2025/png/21644839/1744341343811-822d4419-c0f8-4397-a070-ae6d9381e674.png)

##### iHost  Indicators and Its Entities

Each of the 4 buttons on the top of the iHost has a blue LED indicator. On the side of the iHost, there is a LED light strip. All the 5 indicators exist as a device named **iHost Indicators**, with 5 <Select> entities, as following:

![image-20250411155046569](C:\Users\coolkit\AppData\Roaming\Typora\typora-user-images\image-20250411155046569.png)

![img](https://cdn.nlark.com/yuque/0/2025/png/21644839/1744341362949-2407822d-c1d7-4a23-ae60-c6a4b158f3ce.png)
