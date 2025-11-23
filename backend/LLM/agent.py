import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent))

from google.adk.agents.llm_agent import Agent
import tools
from custom_agent_wrapper_function import build_agent
from os.path import dirname

root_agent = build_agent(llm="ollama/llama3.2:3b",
                         name="Samuel",
                         desc="Agent with the ability to suggest gifts, adds gift suggestions to a list that will later automatically be converted into store links offering those suggestions.",
                         instr_file_path=str(dirname(__file__)) + "/agent_instructions/root.txt",
                         customtools=[tools.add_tool, tools.stop_tool],
                         before_tool_call=[tools.stopcallback, tools.suggestion_search_callback])