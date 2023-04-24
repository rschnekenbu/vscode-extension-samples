import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "telemetry-sample" is now active!');


	const sender: vscode.TelemetrySender = {
		sendErrorData(error, data) {
			console.log("===== extension ERROR sender ===== ");
			console.log(`Exception: ${error}`);
			console.log(`Data: ${JSON.stringify(data)}`);
		},
		sendEventData(eventName, data) {
			console.log("===== extension EVENT sender ===== ");
			console.log(`Event: ${eventName}`);
			console.log(`Data: ${JSON.stringify(data)}`);
		}
	};

	const logger = vscode.env.createTelemetryLogger(sender);

	const c1 = vscode.commands.registerCommand('extension.logEvent', () => {
		const data =  { 
			'testProp': 'testValue',
			'file path': 'file:///foo/bar',
			'fake email': 'foo@bar.co',
			'secret': 'pwd: 126',
			'not-secret': 'pwd126',
			'tesProp2' : {
				'value': undefined,
				'subprop' : 'prop',
				'fake email': 'foo@bar.co'
			}
		};
		vscode.window.showInformationMessage('Logged telemetry event!: '+JSON.stringify(data));
		logger.logUsage('testEvent', data);
	});

	context.subscriptions.push(c1);

	context.subscriptions.push(vscode.commands.registerCommand('extension.logException', () => {
		const data = { 
			'testProp': 'testValue',
			'file path': 'file:///foo/bar',
			'fake email': 'foo@bar.co',
			'secret': 'pwd: 126',
			'not-secret': 'pwd126',
			'tesProp2' : {
				'value': undefined,
				'subprop' : 'prop',
				'fake email': 'foo@bar.co'
			}
		};
		vscode.window.showInformationMessage('Logged telemetry exception!'+JSON.stringify(data));
		logger.logError('testerror', data);
	}));

}
