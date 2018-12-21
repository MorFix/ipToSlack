const os = require('os');
const axios = require('axios');

const fetchIp = () => axios.get('http://ipinfo.io/ip')
	.then(res => res.data.replace('\n', ''));
	
const sendMessage = text => {
	const url = 'https://slack.com/api/chat.postMessage';
	const token = process.argv[2];
	const data = {
		channel: 'ip',
		text
	};

	const headers = {
		'Authorization': `Bearer ${token}`,
		'Content-type': 'application/json'
	};

	return axios.post(url, data, {headers})
		        .then(response => {
			      console.log(response.data);
		        })
		        .catch(error => {
			      console.log(error);
		        });
}

fetchIp().then(ip => sendMessage(`IP for ${os.hostname()}: ${ip}`));