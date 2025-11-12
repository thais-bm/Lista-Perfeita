@echo off
SET VENV_DIR=venv

ECHO Verificando ambiente virtual...

REM 1. Verifica se a pasta do venv nao existe
IF NOT EXIST %VENV_DIR%\Scripts\activate.bat (
    ECHO Criando ambiente virtual em .\%VENV_DIR%\
    REM Tenta usar 'python' primeiro. Se falhar, tenta 'py'.
    python -m venv %VENV_DIR%
    IF %ERRORLEVEL% NEQ 0 (
        ECHO 'python' falhou, tentando 'py'...
        py -m venv %VENV_DIR%
        IF %ERRORLEVEL% NEQ 0 (
            ECHO ERRO: Nao foi possivel criar o ambiente virtual.
            ECHO Verifique se o Python esta instalado e no PATH.
            PAUSE
            EXIT /B 1
        )
    )
    ECHO Ambiente virtual criado.
) ELSE (
    ECHO Ambiente virtual encontrado.
)

REM 2. Ativa o ambiente virtual
ECHO Ativando ambiente virtual...
CALL %VENV_DIR%\Scripts\activate.bat

ECHO.
ECHO ------------------------------------------------------
ECHO  Instalando/atualizando dependencias...
ECHO ------------------------------------------------------
REM 3. Instala as dependencias
pip install -r requirements.txt

ECHO.
ECHO ------------------------------------------------------
ECHO  Iniciando Uvicorn com auto-reload...
ECHO  (Pressione CTRL+C para parar o servidor)
ECHO ------------------------------------------------------
REM 4. Inicia o Uvicorn
uvicorn main:app --reload

REM Mantem a janela aberta se o uvicorn falhar imediatamente
PAUSE