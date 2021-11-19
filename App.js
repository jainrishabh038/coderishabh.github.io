import React, { useEffect, useState } from 'react';

import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setemail] = useState(''); 
  
  const [phone, setphone] = useState('');
  const [id, setid] = useState(1);
  const [dataForUpdate, setdataForUpdate] = useState({});

  const [display, setdisplay] = useState({ display: 'none' });


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);




  function edit(data) {
    setdisplay({ display: 'flex' })
    setName(data.name)
    setemail(data.email)
    setphone(data.phone)
    setid(data.id)
    setdataForUpdate({
      name,
      email,
      phone
    })
  }

  function UpdataData(id) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
      method: 'PUT',
      body: JSON.stringify(dataForUpdate),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => alert('data Updated'));
  }


  function delet(id) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
      method: 'DELETE',
    })
      .then((res) => alert('deleted'))

  }

  return (
    <>
      <ScrollView>

        <View style={[style.bg, display]}>
          <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: 'white' }}> Edit </Text>

          <TextInput value={name} style={[style.text]} onChangeText={(e) => setName(e)} placeholder="Name" />
          <TextInput value={email} style={[style.text]} onChangeText={(e) => setemail(e)} placeholder="Email" />
          <TextInput value={phone} style={[style.text]} onChangeText={(e) => setphone(e)} placeholder="Phone" />

          <TouchableOpacity>
            <Text style={{ margin: 20, marginHorizontal: 40, color: 'red', backgroundColor: 'white', textAlign: "center", padding: 10, borderRadius: 20 }} onPress={() => UpdataData(id)}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={{ margin: 20, marginHorizontal: 40, color: 'red', backgroundColor: 'white', textAlign: "center", padding: 10, borderRadius: 20 }} onPress={() => setdisplay({ display: 'none' })} >Cancle</Text>
          </TouchableOpacity>
        </View>


        <View style={{ backgroundColor: 'green' }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 60,
              borderColor: 'white',
              borderWidth: 2,
              margin: 5,
            }}>
            Fetch
          </Text>
        </View>
        <View style={{ backgroundColor: 'black', }}>
          {data.map((dataa, index) => {
            return (
              <>
                <View style={{ borderColor: 'blue', borderWidth: 1, padding: 20 }} key={index} >
                  <Text style={{ margin: 20, color: 'white' }}>
                    Name : {dataa.name}
                  </Text>
                  <Text style={{ margin: 20, color: 'white' }}>
                    Email : {dataa.email}
                  </Text>
                  <Text style={{ margin: 20, color: 'white' }}>
                    Phone : {dataa.phone}
                  </Text>

                  <TouchableOpacity>
                    <Text style={{ margin: 20, marginHorizontal: 40, color: 'red', backgroundColor: 'skyblue', textAlign: "center", padding: 10, borderRadius: 20 }} onPress={() => edit(dataa)} >Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Text style={{
                      margin: 20, marginHorizontal: 40, color: 'red', backgroundColor: 'skyblue', textAlign: "center", padding: 10, borderRadius: 20

                    }} onPress={() => delet(dataa.id)} >Delete</Text>
                  </TouchableOpacity>

                </View>
              </>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  text: {
    marginVertical: 10,
    border: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    color: 'white',
    placeholder: 'white'
  },
  bg: {
    height: 770,
    paddingVertical: 50,
    backgroundColor: 'black',
    color: 'white'
  }
})

export default App;
