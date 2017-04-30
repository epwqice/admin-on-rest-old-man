<#
.SYNOPSIS
  Manages the build of admin-on-rest on windows
.DESCRIPTION
  This powershell script attempts to implement the linux makefile for admin-on-rest for those users who may wish to 
  develop the system on a windows based operating system.

  Examples:
  1) To install required modules
  ./make.ps1 -install

  2) To run the in-built example code
  ./make.ps1 -run
  
  3) To generate a production build
  ./make.ps1 -build

  3) To generate and run the documentation
  ./make.ps1 -doc
 
  3) To run the included tests
  ./make.ps1 -test

.INPUTS
  -install - [optional] this will call npm install 
  -run - [optional] this will build and run the example
  -build
  -watch
  -doc
  -test
  -testwatch
  -runserver

.OUTPUTS

#>

#-----------------------------------------------------------[Parameters]------------------------------------------------------------

param(
	[parameter(Mandatory=$false, ParameterSetName='install')]
	[SWITCH]$install,

	[parameter(Mandatory=$false, ParameterSetName='run')]
	[SWITCH]$run,

	[parameter(Mandatory=$false, ParameterSetName='build')]
	[SWITCH]$build,

	[parameter(Mandatory=$false, ParameterSetName='watch')]
	[SWITCH]$watch,
	
	[parameter(Mandatory=$false, ParameterSetName='doc')]
	[SWITCH]$doc,
	
	[parameter(Mandatory=$false, ParameterSetName='test')]
	[SWITCH]$test,

	[parameter(Mandatory=$false, ParameterSetName='testwatch')]
	[SWITCH]$testwatch,

    [parameter(Mandatory=$false, ParameterSetName='runserver')]
    [SWITCH]$runserver
 )

#---------------------------------------------------------[Initialisations/Declarations]--------------------------------------------------------

$script_version="1.0"
$initial_directory = $pwd;
$initial_node_env = $env:NODE_ENV

#-----------------------------------------------------------[Functions]------------------------------------------------------------

Function LogWrite([string]$logstring,[string]$color) {
	$LogTime = Get-Date -Format "MM-dd-yyyy HH:mm:ss"
	$logmessage="["+$LogTime+"] "+$logstring
	if(!$logstring) {
		$logmessage=$logstring
	}
	if($color) {
		write-host -fore $color $logmessage
	} else {
		write-host $logmessage
	}
}

#-----------------------------------------------------------[Execution]------------------------------------------------------------

switch($PsCmdlet.ParameterSetName){
	'install' {
		$env:NODE_ENV = "development"
		LogWrite -color Cyan "Performing install of submodules (npm install)"
		npm install
		if( $LASTEXITCODE -eq 0 ) {
			LogWrite -color Green "Npm install completed"
		} else {
			LogWrite -color Red "Npm install did not return a successful exit code. Check Failure reason"		
		}
	}
	'run' {
		$env:NODE_ENV = "development"
		LogWrite -color Cyan "Running admin-on-rest example"
		cd example 
		LogWrite -color Cyan "Install example modules"
		npm install
		if( $LASTEXITCODE -eq 0 ) {
			LogWrite -color Green "Npm install completed"
		} else {
			LogWrite -color Red "Npm install did not return a successful exit code. Check Failure reason"		
		}		
		..\node_modules\.bin\webpack-dev-server --hot --inline --config .\webpack.config.js
	}
	'build' {
        $env:NODE_ENV="production"
        ./node_modules/.bin/babel ./src -d lib --ignore '*.spec.js'
		# 	@cd src && rsync -R `find . -name *.css` ../lib # copy all CSS files keeping structure from src to lib
	
	}	
	'watch' {
		$env:NODE_ENV = "production"
		.\node_modules\.bin\webpack -w
	}
	'doc' {
		cd docs
		jekyll server . --watch
	}
	'test' {
		$env:NODE_ENV = "test"
		$env:NODE_ICU_DATA="node_modules\full-icu"
		.\node_modules\.bin\mocha --require ignore-styles --compilers js:babel-register '.\src\**\*.spec.js'
	}
	'testwatch' {
		$env:NODE_ENV = "test"
		$env:NODE_ICU_DATA="node_modules\full-icu"
		.\node_modules\.bin\mocha --require ignore-styles --compilers js:babel-register --watch '.\src\**\*.spec.js'
	}
    'runserver' {
        .\node_modules\.bin\babel-node .\main.js --preset es2015, stage-0
    }
	default {

	}
}

# Reset Environment
cd $initial_directory
$env:NODE_ENV = $initial_node_env